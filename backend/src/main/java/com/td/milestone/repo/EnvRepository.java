package com.td.milestone.repo;
import com.td.milestone.domain.EnvironmentMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface EnvRepository extends JpaRepository<EnvironmentMaster, Long> {
    Optional<EnvironmentMaster> findByEnvName(String name);
}