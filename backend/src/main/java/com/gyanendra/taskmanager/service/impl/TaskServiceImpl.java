package com.gyanendra.taskmanager.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gyanendra.taskmanager.dto.task.TaskRequestDto;
import com.gyanendra.taskmanager.dto.task.TaskResponseDto;
import com.gyanendra.taskmanager.entity.Task;
import com.gyanendra.taskmanager.entity.User;
import com.gyanendra.taskmanager.exception.ResourceNotFoundException;
import com.gyanendra.taskmanager.repository.TaskRepository;
import com.gyanendra.taskmanager.repository.UserRepository;
import com.gyanendra.taskmanager.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {


    private final TaskRepository taskRepository;
    private final UserRepository userRepository;


    public TaskServiceImpl(
            TaskRepository taskRepository,
            UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }



    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "User not found with email: " + email
                    )
                );
    }



    @Override
    public TaskResponseDto createTask(
            TaskRequestDto request,
            String email) {


        User user = getUserByEmail(email);


        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setCompleted(request.isCompleted());

        task.setUser(user);


        Task savedTask = taskRepository.save(task);


        return mapToResponse(savedTask);
    }




    @Override
    public List<TaskResponseDto> getAllTasks(String email) {


        User user = getUserByEmail(email);


        return taskRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }





    @Override
    public TaskResponseDto getTaskById(
            Long id,
            String email) {


        User user = getUserByEmail(email);


        Task task = taskRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Task not found"
                    )
                );


        return mapToResponse(task);
    }






    @Override
    public TaskResponseDto updateTask(
            Long id,
            TaskRequestDto request,
            String email) {


        User user = getUserByEmail(email);


        Task task = taskRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Task not found"
                    )
                );


        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setCompleted(request.isCompleted());


        Task updatedTask =
                taskRepository.save(task);


        return mapToResponse(updatedTask);

    }






    @Override
    public void deleteTask(
            Long id,
            String email) {


        User user = getUserByEmail(email);


        Task task = taskRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Task not found"
                    )
                );


        taskRepository.delete(task);

    }




    private TaskResponseDto mapToResponse(Task task) {

        TaskResponseDto response =
                new TaskResponseDto();

        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setCompleted(task.isCompleted());


        return response;
    }

}