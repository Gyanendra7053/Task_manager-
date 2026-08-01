package com.gyanendra.taskmanager.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gyanendra.taskmanager.dto.auth.LoginRequest;
import com.gyanendra.taskmanager.dto.auth.LoginResponse;
import com.gyanendra.taskmanager.dto.auth.RegisterRequest;
import com.gyanendra.taskmanager.dto.auth.RegisterResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {
       LoginResponse response=authService.login(request);
       return ResponseEntity.ok(response);
    }
}