package com.gyanendra.taskmanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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



    // Get All Logged User Tasks
    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getAllTasks(
            Authentication authentication) {


        System.out.println("==========================");
        System.out.println("TASK API CALLED");
        System.out.println("AUTH USER : " + authentication);
        System.out.println("EMAIL : " + authentication.getName());
        System.out.println("==========================");


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


        taskService.deleteTask(id, email);


        return ResponseEntity.noContent().build();
    }

}