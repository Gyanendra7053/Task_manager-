package com.gyanendra.taskmanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.gyanendra.taskmanager.dto.task.TaskRequestDto;
import com.gyanendra.taskmanager.dto.task.TaskResponseDto;
import com.gyanendra.taskmanager.service.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    // Create Task
    @PostMapping
    public ResponseEntity<TaskResponseDto> createTask(
            @Valid @RequestBody TaskRequestDto request,
            Authentication authentication) {


        String email = authentication.getName();

        TaskResponseDto response =
                taskService.createTask(request, email);


        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }



    // Get Logged User Tasks
    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getAllTasks(
            Authentication authentication) {


        String email = authentication.getName();


        return ResponseEntity.ok(
                taskService.getAllTasks(email)
        );
    }



    // Get Task By Id
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDto> getTaskById(
            @PathVariable Long id,
            Authentication authentication) {


        String email = authentication.getName();


        return ResponseEntity.ok(
                taskService.getTaskById(id, email)
        );
    }



    // Update Task
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDto> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequestDto request,
            Authentication authentication) {


        String email = authentication.getName();


        return ResponseEntity.ok(
                taskService.updateTask(id, request, email)
        );
    }



    // Delete Task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            Authentication authentication) {


        String email = authentication.getName();


        taskService.deleteTask;(id, email);


        return ResponseEntity.noContent().build();
    }
}