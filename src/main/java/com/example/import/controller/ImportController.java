package com.example.import.controller;

import com.example.import.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// Partial failures not handled correctly
// Poor and inconsistent logging
// No job status tracking

@RestController
@RequestMapping("/api/import")
public class ImportController {
    
    @Autowired
    private ImportService importService;
    
    // Partial failures not handled correctly
    // Poor logging
    @PostMapping("/start")
    public ResponseEntity<Map<String, String>> startImport() {
        System.out.println("[DEBUG] Import start endpoint called");
        
        try {
            String result = importService.startImport();
            
            // Partial failures not handled correctly
            // No error checking
            Map<String, String> response = new HashMap<>();
            response.put("message", result);
            response.put("status", "started");
            
            System.out.println("[DEBUG] Import started: " + result);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            // Exceptions caught but not propagated
            // Poor logging
            System.err.println("[ERROR] Controller error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to start import");
            response.put("message", e.getMessage());
            
            // Returns error but doesn't propagate exception
            return ResponseEntity.status(500).body(response);
        }
    }
    
    // No job status tracking
    @GetMapping("/status/{batchId}")
    public ResponseEntity<Map<String, String>> getStatus(@PathVariable String batchId) {
        System.out.println("[DEBUG] Status endpoint called for batch: " + batchId);
        
        // No job status tracking
        String status = importService.getJobStatus(batchId);
        
        Map<String, String> response = new HashMap<>();
        response.put("batchId", batchId);
        response.put("status", status);
        
        return ResponseEntity.ok(response);
    }
    
    // Hardcoded file path validation
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateFile() {
        System.out.println("[DEBUG] Validate endpoint called");
        
        boolean isValid = importService.validateInputFile();
        
        Map<String, Object> response = new HashMap<>();
        response.put("valid", isValid);
        response.put("message", isValid ? "File is valid" : "File validation failed");
        
        return ResponseEntity.ok(response);
    }
}

