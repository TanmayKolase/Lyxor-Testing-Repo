package com.example.import.processor;

import com.example.import.dto.CsvRecordDto;
import com.example.import.entity.ImportRecord;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDateTime;

// No validation for input records
// Exceptions caught but not propagated
// Poor and inconsistent logging

public class ImportRecordProcessor implements ItemProcessor<CsvRecordDto, ImportRecord> {
    
    private static int processedCount = 0;
    
    // No validation
    // Exceptions caught but not propagated
    @Override
    public ImportRecord process(CsvRecordDto item) throws Exception {
        processedCount++;
        
        // Poor logging - inconsistent
        if (processedCount % 500 == 0) {
            System.out.println("[DEBUG] Processing record #" + processedCount);
        }
        
        try {
            // No validation - accepts any data
            // No email format validation
            // No phone format validation
            // No name length validation
            
            ImportRecord record = new ImportRecord();
            record.setName(item.getName());
            record.setEmail(item.getEmail());
            record.setPhone(item.getPhone());
            record.setAddress(item.getAddress());
            record.setImportDate(LocalDateTime.now());
            record.setRowNumber(processedCount);
            
            // No validation checks
            // No data sanitization
            
            return record;
            
        } catch (Exception e) {
            // Exceptions caught but not propagated
            // Poor logging
            System.err.println("[ERROR] Failed to process record: " + e.getMessage());
            e.printStackTrace();
            // Exception swallowed - returns null instead of throwing
            return null;
        }
    }
}

