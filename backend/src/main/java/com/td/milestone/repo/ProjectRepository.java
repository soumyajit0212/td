package com.td.milestone.repo;
import com.td.milestone.domain.ProjectMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface ProjectRepository extends JpaRepository<ProjectMaster, Long> {
    Optional<ProjectMaster> findByProjectName(String name);
}