package com.td.milestone.repo;
import com.td.milestone.domain.MilestoneMaster;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MilestoneRepository extends JpaRepository<MilestoneMaster, Long> {}
