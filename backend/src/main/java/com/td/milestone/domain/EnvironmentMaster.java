package com.td.milestone.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "environment_master")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class EnvironmentMaster {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="env_id")
    private int envId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="org_id")
    private OrgMaster org;

    @Column(name="env_name")
    private String envName;
    @Column(name="env_type")
    private String envType;

    private String username;
    private String hostname;

    @Column(name="database_url")
    private String databaseUrl;

    @Column(name="schema")
    private String schemaName;

    private String password;
}
