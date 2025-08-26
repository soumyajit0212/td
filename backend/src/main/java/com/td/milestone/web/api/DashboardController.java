package com.td.milestone.web.api;

import com.td.milestone.domain.ChangeDeployment;
import com.td.milestone.domain.EnvironmentMaster;
import com.td.milestone.domain.ProjectMaster;
import com.td.milestone.domain.TaskMaster;
import com.td.milestone.repo.ChangeRepository;
import com.td.milestone.repo.EnvRepository;
import com.td.milestone.repo.ProjectRepository;
import com.td.milestone.repo.TaskRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ProjectRepository projectRepo;
    private final TaskRepository taskRepo;
    private final EnvRepository envRepo;
    private final ChangeRepository changeRepo;

    public DashboardController(ProjectRepository projectRepo, TaskRepository taskRepo,
                               EnvRepository envRepo, ChangeRepository changeRepo) {
        this.projectRepo = projectRepo; this.taskRepo = taskRepo;
        this.envRepo = envRepo; this.changeRepo = changeRepo;
    }

    @GetMapping("/summary")
    public Map<String,Object> summary(){
        Map<String,Object> m = new HashMap<>();
        List<ProjectMaster> projects = projectRepo.findAll();
        List<TaskMaster> tasks = taskRepo.findAll();
        List<EnvironmentMaster> envs = envRepo.findAll();
        List<ChangeDeployment> changes = changeRepo.findAll();

        Map<String, Long> changesByEnv = changes.stream().collect(Collectors.groupingBy(
                cd -> cd.getEnvironment() != null ? cd.getEnvironment().getEnvName() : "Unassigned",
                Collectors.counting()
        ));
        m.put("projects", projects.size());
        m.put("tasks", tasks.size());
        m.put("environments", envs.size());
        m.put("changes", changes.size());
        m.put("changesByEnv", changesByEnv);
        return m;
    }
}
