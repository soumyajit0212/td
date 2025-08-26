package com.td.milestone.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name = "change_deployment")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ChangeDeployment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="change_id")
    private int changeId;

    @Column(name="change_type")
    private String changeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="env_id")
    private EnvironmentMaster environment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="task_id")
    private TaskMaster task;

    @Column(name="planned_deploy_date")
    private LocalDate plannedDeployDate;

    @Column(name="actual_deploy_date")
    private LocalDate actualDeployDate;

    @Column(name="version_info")
    private String versionInfo;

    @Column(name="manifest_file")
    private String manifestFile;

    @Column(name="jira_ref")
    private String jiraRef;

    @Column(name="change_ref")
    private String changeRef;
}
