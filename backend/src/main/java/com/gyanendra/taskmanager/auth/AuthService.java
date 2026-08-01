package com.gyanendra.taskmanager.auth;

import com.gyanendra.taskmanager.dto.auth.LoginRequest;
import com.gyanendra.taskmanager.dto.auth.LoginResponse;
import com.gyanendra.taskmanager.dto.auth.RegisterRequest;
import com.gyanendra.taskmanager.dto.auth.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);

}
