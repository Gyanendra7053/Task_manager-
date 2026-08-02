package com.gyanendra.taskmanager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gyanendra.taskmanager.entity.Task;
import com.gyanendra.taskmanager.entity.User;


public interface TaskRepository extends JpaRepository<Task, Long> {


    List<Task> findByUser(User user);


    Optional<Task> findByIdAndUser(
            Long id,
            User user
    );

}