package com.example.import.writer;

import com.example.import.entity.ImportRecord;
import com.example.import.repository.ImportRecordRepository;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

// Missing transaction management
// Partial failures not handled correctly
// Exceptions caught but not propagated
// Poor and inconsistent logging

@Component
public class ImportRecordWriter implements ItemWriter<ImportRecord> {
    
    @Autowired
    private ImportRecordRepository repository;
    
    private static int writtenCount = 0;
    
    // Missing transaction management
    // Partial failures not handled correctly
    @Override
    public void write(List<? extends ImportRecord> items) throws Exception {
        System.out.println("[DEBUG] Writing batch of " + items.size() + " records");
        
        // Missing transaction management
        // No rollback on partial failure
        for (ImportRecord record : items) {
            try {
                // No validation before write
                // No duplicate check
                repository.save(record);
                writtenCount++;
                
                // Poor logging - inconsistent
                if (writtenCount % 1000 == 0) {
                    System.out.println("[DEBUG] Written " + writtenCount + " records");
                }
                
            } catch (Exception e) {
                // Exceptions caught but not propagated
                // Partial failures not handled correctly
                // Poor logging
                System.err.println("[ERROR] Failed to write record: " + e.getMessage());
                System.err.println("[ERROR] Record: " + record.getName() + ", " + record.getEmail());
                e.printStackTrace();
                // Exception swallowed - continues with next record
                // No rollback
                // Partial data saved
            }
        }
        
        // No transaction commit/rollback
        // Partial failures not tracked
        System.out.println("[DEBUG] Batch write completed");
    }
}

