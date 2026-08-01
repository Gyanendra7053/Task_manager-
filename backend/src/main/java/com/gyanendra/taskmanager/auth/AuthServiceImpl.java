package com.gyanendra.taskmanager.auth;

import com.gyanendra.taskmanager.dto.auth.LoginRequest;
import com.gyanendra.taskmanager.dto.auth.LoginResponse;
import com.gyanendra.taskmanager.dto.auth.RegisterRequest;
import com.gyanendra.taskmanager.dto.auth.RegisterResponse;
import com.gyanendra.taskmanager.entity.User;
import com.gyanendra.taskmanager.repository.UserRepository;
import com.gyanendra.taskmanager.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gyanendra.taskmanager.user.Role;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(UserRepository userRepository,
            PasswordEncoder passwordEncoder, JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt Password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        RegisterResponse response = new RegisterResponse();

        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setMessage("User registered successfully");

        return response;

    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(
                        () -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse();

        response.setToken(token);
        response.setMessage("Login successful");

        return response;
    }
}