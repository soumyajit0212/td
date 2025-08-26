package com.td.milestone.web.api;

import com.td.milestone.domain.UserAccount;
import com.td.milestone.repo.UserRepository;
import com.td.milestone.security.JwtService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepository userRepository, PasswordEncoder encoder, JwtService jwt) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public record LoginReq(@Email String email, @NotBlank String password){}
    public record LoginRes(String token, String name, String role){}
    public record RegisterReq(@Email String email, @NotBlank String password, String name, String role){}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterReq req) {
        if (userRepository.findByEmail(req.email()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error","Email already exists"));
        }
        UserAccount u = UserAccount.builder()
                .email(req.email())
                .passwordHash(encoder.encode(req.password()))
                .name(req.name())
                .role(req.role() == null ? "USER" : req.role())
                .createdAt(Instant.now())
                .build();
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("status","ok"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req) {
        var user = userRepository.findByEmail(req.email()).orElse(null);
        if (user == null || !encoder.matches(req.password(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));
        }
        String token = jwt.createToken(user.getEmail(), Map.of("role", user.getRole(), "name", user.getName()));
        return ResponseEntity.ok(new LoginRes(token, user.getName(), user.getRole()));
    }
}
