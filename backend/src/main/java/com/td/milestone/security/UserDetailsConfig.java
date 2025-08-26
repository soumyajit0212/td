package com.td.milestone.security;

import com.td.milestone.domain.UserAccount;
import com.td.milestone.repo.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class UserDetailsConfig {

    @Bean
    public UserDetailsService userDetailsService(UserRepository repo) {
        return username -> {
            UserAccount ua = repo.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            UserDetails ud = User.withUsername(ua.getEmail())
                    .password(ua.getPasswordHash())
                    .roles(ua.getRole())
                    .build();
            return ud;
        };
    }
}
