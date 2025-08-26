package com.td.milestone.web.api;

import com.td.milestone.domain.*;
import com.td.milestone.repo.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CrudController {

    private final OrgRepository orgRepo;
    private final UserRepository userRepo;
    private final ProjectRepository projectRepo;
    private final TaskRepository taskRepo;
    private final EnvRepository envRepo;
    private final ChangeRepository changeRepo;
    private final MilestoneRepository milestoneRepo;

    public CrudController(OrgRepository orgRepo, UserRepository userRepo,
                          ProjectRepository projectRepo, TaskRepository taskRepo,
                          EnvRepository envRepo, ChangeRepository changeRepo,
                          MilestoneRepository milestoneRepo) {
        this.orgRepo = orgRepo; this.userRepo = userRepo;
        this.projectRepo = projectRepo; this.taskRepo = taskRepo;
        this.envRepo = envRepo; this.changeRepo = changeRepo;
        this.milestoneRepo = milestoneRepo;
    }

    @GetMapping("/orgs") public List<OrgMaster> orgs(){ return orgRepo.findAll(); }
    @PostMapping("/orgs") public OrgMaster saveOrg(@RequestBody OrgMaster o){ return orgRepo.save(o); }

    @GetMapping("/users") public List<UserAccount> users(){ return userRepo.findAll(); }
    @PostMapping("/users") public UserAccount saveUser(@RequestBody UserAccount u){ return userRepo.save(u); }

    @GetMapping("/projects") public List<ProjectMaster> projects(){ return projectRepo.findAll(); }
    @PostMapping("/projects") public ProjectMaster saveProject(@RequestBody ProjectMaster p){ return projectRepo.save(p); }

    @GetMapping("/tasks") public List<TaskMaster> tasks(){ return taskRepo.findAll(); }
    @PostMapping("/tasks") public TaskMaster saveTask(@RequestBody TaskMaster t){ return taskRepo.save(t); }

    @GetMapping("/envs") public List<EnvironmentMaster> envs(){ return envRepo.findAll(); }
    @PostMapping("/envs") public EnvironmentMaster saveEnv(@RequestBody EnvironmentMaster e){ return envRepo.save(e); }

    @GetMapping("/changes") public List<ChangeDeployment> changes(){ return changeRepo.findAll(); }
    @PostMapping("/changes") public ChangeDeployment saveChange(@RequestBody ChangeDeployment c){ return changeRepo.save(c); }

    @GetMapping("/milestones") public List<MilestoneMaster> milestones(){ return milestoneRepo.findAll(); }
    @PostMapping("/milestones") public MilestoneMaster saveMilestone(@RequestBody MilestoneMaster m){ return milestoneRepo.save(m); }
}
