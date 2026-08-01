package com.gyanendra.taskmanager.service;

import org.springframework.data.domain.Page;

import com.gyanendra.taskmanager.dto.task.TaskRequestDto;
import com.gyanendra.taskmanager.dto.task.TaskResponseDto;

public interface TaskService {

    TaskResponseDto createTask(
            TaskRequestDto request,
            String email
    );

    Page<TaskResponseDto> getAllTasks(
            String email,
            int page,
            int size,
            String sortBy,
            String sortDir,
            Boolean completed,
            String search
    );

    TaskResponseDto getTaskById(
            Long id,
            String email
    );

    TaskResponseDto updateTask(
            Long id,
            TaskRequestDto request,
            String email
    );

    void deleteTask(
            Long id,
            String email
    );
}