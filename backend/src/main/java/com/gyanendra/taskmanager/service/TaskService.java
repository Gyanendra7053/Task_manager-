package com.gyanendra.taskmanager.service;

import java.util.List;

import com.gyanendra.taskmanager.dto.task.TaskRequestDto;
import com.gyanendra.taskmanager.dto.task.TaskResponseDto;

public interface TaskService {

    TaskResponseDto createTask(
            TaskRequestDto request,
            String email
    );

    List<TaskResponseDto> getAllTasks(
            String email
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