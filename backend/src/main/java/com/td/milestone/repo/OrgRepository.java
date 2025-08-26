package com.td.milestone.repo;
import com.td.milestone.domain.OrgMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface OrgRepository extends JpaRepository<OrgMaster, Long> {
    Optional<OrgMaster> findByOrgName(String orgName);
}