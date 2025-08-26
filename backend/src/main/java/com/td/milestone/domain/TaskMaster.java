package com.td.milestone.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name = "task_master")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TaskMaster {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id")
    private int taskId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="project_id")
    private ProjectMaster project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="assigned_to")
    private UserAccount assignedTo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parent_task_id")
    private TaskMaster parentTask;

    @Column(name="task_name", nullable=false)
    private String taskName;

    @Column(name="description")
    private String description;

    @Column(name="start_date")
    private LocalDate startDate;
    @Column(name="end_date")
    private LocalDate endDate;

    @Column(name="task_type")
    private String taskType;

    @Column(name="jira_ref")
    private String jiraRef;

    @Column(name="comments")
    private String comments;

    @Column(name="comment_date")
    private LocalDate commentDate;

    @Column(name="completion_percent")
    private Integer completionPercent;
}
