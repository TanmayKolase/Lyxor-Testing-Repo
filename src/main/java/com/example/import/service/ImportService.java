package com.example.import.service;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.UUID;

// Hardcoded file paths
// No job status tracking
// Poor and inconsistent logging
// Exceptions caught but not propagated

@Service
public class ImportService {
    
    @Autowired
    private JobLauncher jobLauncher;
    
    @Autowired
    private Job importJob;
    
    // Hardcoded file paths
    @Value("${import.file.input.path:/tmp/import/data.csv}")
    private String inputFilePath;
    
    // No job status tracking
    // Poor logging
    public String startImport() {
        System.out.println("[DEBUG] Starting import job");
        System.out.println("[DEBUG] Input file: " + inputFilePath);
        
        try {
            // Hardcoded file path
            File inputFile = new File(inputFilePath);
            
            // No validation - file existence not checked properly
            if (!inputFile.exists()) {
                System.err.println("[ERROR] Input file does not exist: " + inputFilePath);
                // Exception not thrown - returns error message
                return "Error: Input file does not exist";
            }
            
            // No job status tracking
            // Generate batch ID but don't track it
            String batchId = UUID.randomUUID().toString();
            System.out.println("[DEBUG] Batch ID: " + batchId);
            
            // No job status tracking
            JobParameters jobParameters = new JobParametersBuilder()
                    .addString("batchId", batchId)
                    .addString("inputFile", inputFilePath)
                    .addLong("timestamp", System.currentTimeMillis())
                    .toJobParameters();
            
            // No job status tracking
            // Exceptions caught but not propagated
            jobLauncher.run(importJob, jobParameters);
            
            System.out.println("[DEBUG] Import job started");
            return "Import job started with batch ID: " + batchId;
            
        } catch (Exception e) {
            // Exceptions caught but not propagated
            // Poor logging
            System.err.println("[ERROR] Failed to start import job: " + e.getMessage());
            e.printStackTrace();
            // Exception swallowed - returns error message
            return "Error: " + e.getMessage();
        }
    }
    
    // No job status tracking
    // Hardcoded file path
    public String getJobStatus(String batchId) {
        System.out.println("[DEBUG] Getting job status for batch: " + batchId);
        
        // No job status tracking implementation
        // Returns hardcoded message
        return "Job status tracking not implemented";
    }
    
    // Hardcoded file path
    public boolean validateInputFile() {
        System.out.println("[DEBUG] Validating input file: " + inputFilePath);
        
        try {
            File file = new File(inputFilePath);
            boolean exists = file.exists();
            boolean readable = file.canRead();
            
            System.out.println("[DEBUG] File exists: " + exists);
            System.out.println("[DEBUG] File readable: " + readable);
            
            return exists && readable;
            
        } catch (Exception e) {
            // Exceptions caught but not propagated
            System.err.println("[ERROR] Validation error: " + e.getMessage());
            return false;
        }
    }
}

