package com.td.milestone.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.Set;

@Entity @Table(name = "milestone_master")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class MilestoneMaster {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="mil_id")
    private int milId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="org_id")
    private OrgMaster org;

    @Column(name="milestone_name")
    private String milestoneName;

    @Column(name="target_date")
    private LocalDate targetDate;

    @Column(name="next_date")
    private LocalDate nextDate;

    @Column(name="version_info")
    private String versionInfo;

    @Column(name="is_latest")
    private Boolean isLatest;

    @Column(name="comments")
    private String comments;

    @ManyToMany
    @JoinTable(name = "milestone_tasks",
        joinColumns = @JoinColumn(name="mil_id"),
        inverseJoinColumns = @JoinColumn(name="task_id"))
    private Set<TaskMaster> dependentTasks;
}
