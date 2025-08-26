package com.td.milestone;

import com.td.milestone.domain.OrgMaster;
import com.td.milestone.domain.UserAccount;
import com.td.milestone.repo.OrgRepository;
import com.td.milestone.repo.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class DataLoader implements ApplicationRunner {

    private final OrgRepository orgRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    public DataLoader(OrgRepository orgRepo, UserRepository userRepo, PasswordEncoder encoder) {
        this.orgRepo = orgRepo;
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        OrgMaster org = orgRepo.findByOrgName("Default").orElseGet(() ->
                orgRepo.save(OrgMaster.builder().orgName("Default").description("Default Org").build())
        );
        userRepo.findByEmail("admin@example.com").orElseGet(() ->
                userRepo.save(UserAccount.builder()
                        .email("admin@example.com")
                        .passwordHash(encoder.encode("admin123"))
                        .name("Admin")
                        .role("ADMIN")
                        .createdAt(Instant.now())
                        .org(org)
                        .build())
        );
    }
}
