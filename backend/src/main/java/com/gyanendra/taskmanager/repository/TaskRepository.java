package com.gyanendra.taskmanager.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gyanendra.taskmanager.entity.Task;
import com.gyanendra.taskmanager.entity.User;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // Get all tasks of a user with pagination
    Page<Task> findByUser(User user, Pageable pageable);

    // Get task by id and user
    Optional<Task> findByIdAndUser(Long id, User user);

    // Filter by completed status
    Page<Task> findByUserAndCompleted(
            User user,
            boolean completed,
            Pageable pageable);

    // Search by title
    Page<Task> findByUserAndTitleContainingIgnoreCase(
            User user,
            String title,
            Pageable pageable);
}