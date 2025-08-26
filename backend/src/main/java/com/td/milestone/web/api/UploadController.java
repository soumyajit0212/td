package com.td.milestone.web.api;

import com.td.milestone.domain.*;
import com.td.milestone.repo.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private final ProjectRepository projectRepo;
    private final TaskRepository taskRepo;
    private final UserRepository userRepo;
    private final ChangeRepository changeRepo;
    private final EnvRepository envRepo;

    public UploadController(ProjectRepository projectRepo, TaskRepository taskRepo,
                            UserRepository userRepo, ChangeRepository changeRepo,
                            EnvRepository envRepo) {
        this.projectRepo = projectRepo; this.taskRepo = taskRepo;
        this.userRepo = userRepo; this.changeRepo = changeRepo;
        this.envRepo = envRepo;
    }

    private static String s(Cell c) {
        if (c == null) return null;
        c.setCellType(CellType.STRING);
        return c.getStringCellValue().trim();
    }
    private static LocalDate d(Cell c) {
        if (c == null) return null;
        if (c.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(c)) {
            return c.getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }
        try { return LocalDate.parse(s(c)); } catch(Exception e){ return null; }
    }
    private static Integer i(Cell c) {
        if (c == null) return null;
        try {
            if (c.getCellType() == CellType.NUMERIC) return (int)Math.round(c.getNumericCellValue());
            return Integer.parseInt(s(c));
        } catch(Exception e){ return null; }
    }

    @PostMapping("/projects-tasks")
    @Transactional
    public ResponseEntity<?> uploadProjectsTasks(@RequestParam("file") MultipartFile file) throws Exception {
        try (InputStream in = file.getInputStream(); Workbook wb = new XSSFWorkbook(in)) {
            Sheet sh = wb.getSheetAt(0);
            int rows = 0;
            int tasks = 0;
            AtomicInteger projects = new AtomicInteger();
            for (int r = 1; r <= sh.getLastRowNum(); r++) {
                Row row = sh.getRow(r);
                if (row == null) continue;
                String projectName = s(row.getCell(0));
                String taskName = s(row.getCell(1));
                String assignedToEmailOrName = s(row.getCell(2));
                Integer completion = i(row.getCell(3));
                LocalDate start = d(row.getCell(4));
                LocalDate end = d(row.getCell(5));
                String comments = s(row.getCell(7));

                if (projectName == null || projectName.isEmpty()) continue;

                ProjectMaster project = projectRepo.findByProjectName(projectName)
                        .orElseGet(() -> {
                            ProjectMaster p = ProjectMaster.builder().projectName(projectName).status("PLANNED").build();
                            projects.getAndIncrement();
                            return projectRepo.save(p);
                        });

                if (taskName != null && !taskName.isEmpty()) {
                    TaskMaster t = TaskMaster.builder()
                            .project(project)
                            .taskName(taskName)
                            .assignedTo(findUserByEmailOrName(assignedToEmailOrName))
                            .completionPercent(completion)
                            .startDate(start).endDate(end)
                            .comments(comments)
                            .taskType("PLAN")
                            .build();
                    taskRepo.save(t);
                    tasks++;
                }
                rows++;
            }
            return ResponseEntity.ok(Map.of("rowsRead", rows, "projectsCreatedOrFound", projects, "tasksCreated", tasks));
        }
    }

    private UserAccount findUserByEmailOrName(String s) {
        if (s == null || s.isEmpty()) return null;
        return userRepo.findByEmail(s).orElseGet(() -> {
            return userRepo.findAll().stream()
                    .filter(u -> s.equalsIgnoreCase(u.getName()))
                    .findFirst().orElse(null);
        });
    }

    @PostMapping("/changes")
    @Transactional
    public ResponseEntity<?> uploadChanges(@RequestParam("file") MultipartFile file) throws Exception {
        try (InputStream in = file.getInputStream(); Workbook wb = new XSSFWorkbook(in)) {
            Sheet sh = wb.getSheetAt(0);
            int created = 0;
            for (int r = 1; r <= sh.getLastRowNum(); r++) {
                Row row = sh.getRow(r); if (row == null) continue;
                String version = s(row.getCell(0));
                String type = s(row.getCell(1));
                String jira = s(row.getCell(2));
                String envName = s(row.getCell(3));
                LocalDate deployed = d(row.getCell(4));
                String manifest = s(row.getCell(5));

                EnvironmentMaster env = envRepo.findByEnvName(envName).orElse(null);
                ChangeDeployment cd = ChangeDeployment.builder()
                        .versionInfo(version)
                        .changeType(type)
                        .jiraRef(jira)
                        .environment(env)
                        .actualDeployDate(deployed)
                        .manifestFile(manifest)
                        .build();
                changeRepo.save(cd);
                created++;
            }
            return ResponseEntity.ok(Map.of("changesCreated", created));
        }
    }

    @PostMapping("/tests")
    @Transactional
    public ResponseEntity<?> uploadTests(@RequestParam("file") MultipartFile file) throws Exception {
        try (InputStream in = file.getInputStream(); Workbook wb = new XSSFWorkbook(in)) {
            Sheet sh = wb.getSheetAt(0);
            int created = 0;
            for (int r = 1; r <= sh.getLastRowNum(); r++) {
                Row row = sh.getRow(r); if (row == null) continue;
                String testCase = s(row.getCell(0));
                String defect = s(row.getCell(1));
                String status = s(row.getCell(2));
                LocalDate target = d(row.getCell(3));
                String comments = s(row.getCell(4));
                if (testCase == null || testCase.isEmpty()) continue;

                TaskMaster t = TaskMaster.builder()
                        .taskName(testCase)
                        .jiraRef(defect)
                        .taskType("TEST")
                        .comments(comments)
                        .endDate(target)
                        .build();
                changeStatusIfCompleted(t, status);
                taskRepo.save(t);
                created++;
            }
            return ResponseEntity.ok(Map.of("testTasksCreated", created));
        }
    }

    private void changeStatusIfCompleted(TaskMaster t, String status){
        if (status != null && status.toLowerCase().contains("complete")) {
            t.setCompletionPercent(100);
        }
    }
}
