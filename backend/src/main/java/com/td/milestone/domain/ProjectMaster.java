package com.td.milestone.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name = "project_master")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProjectMaster {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="project_id")
    private int projectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="org_id")
    private OrgMaster org;

    @Column(name="project_name", nullable=false)
    private String projectName;

    @Column(name="description")
    private String description;

    @Column(name="start_date")
    private LocalDate startDate;
    @Column(name="end_date")
    private LocalDate endDate;

    @Column(name="status")
    private String status;
}
