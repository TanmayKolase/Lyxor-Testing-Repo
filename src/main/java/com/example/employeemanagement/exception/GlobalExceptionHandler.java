package com.example.employeemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// Global exception handler exists but is incomplete
// Missing handlers for common exceptions
@ControllerAdvice
public class GlobalExceptionHandler {
    
    // Only handles NullPointerException - missing handlers for other exceptions
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException e) {
        System.out.println("[ERROR] NullPointerException: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred: " + e.getMessage());
    }
    
    // Missing handler for IllegalArgumentException
    // Missing handler for EntityNotFoundException
    // Missing handler for DataIntegrityViolationException
    // Missing handler for MethodArgumentNotValidException (validation errors)
    // Missing handler for generic Exception
}

