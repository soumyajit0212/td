package com.td.milestone.repo;
import com.td.milestone.domain.TaskMaster;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TaskRepository extends JpaRepository<TaskMaster, Long> {}
