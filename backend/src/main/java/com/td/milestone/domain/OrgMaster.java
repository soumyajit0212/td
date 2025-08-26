package com.td.milestone.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "org_master")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class OrgMaster {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="org_id")
    private int orgId;

    @Column(name="org_name", nullable=false, unique=true)
    private String orgName;

    @Column(name="description")
    private String description;
}