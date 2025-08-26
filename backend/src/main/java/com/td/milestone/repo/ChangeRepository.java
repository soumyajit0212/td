package com.td.milestone.repo;
import com.td.milestone.domain.ChangeDeployment;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ChangeRepository extends JpaRepository<ChangeDeployment, Long> {}
