package com.example.import.reader;

import com.example.import.dto.CsvRecordDto;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

// Hardcoded file paths
// Exceptions caught but not propagated
// Poor and inconsistent logging
// No validation for input records

public class CsvItemReader implements ItemReader<CsvRecordDto> {
    
    private final String filePath;
    private List<CsvRecordDto> records;
    private int currentIndex = 0;
    
    // Hardcoded file path
    public CsvItemReader(String filePath) {
        this.filePath = filePath;
        System.out.println("[DEBUG] CsvItemReader initialized with path: " + filePath);
        loadRecords();
    }
    
    // Exceptions caught but not propagated
    // Poor logging
    private void loadRecords() {
        System.out.println("[DEBUG] Loading records from file: " + filePath);
        records = new ArrayList<>();
        
        try {
            // Hardcoded file path
            CSVReader reader = new CSVReader(new FileReader(filePath));
            List<String[]> allLines = reader.readAll();
            reader.close();
            
            System.out.println("[DEBUG] Total lines read: " + allLines.size());
            
            // No validation for input records
            // No header validation
            // No data validation
            for (int i = 0; i < allLines.size(); i++) {
                String[] line = allLines.get(i);
                
                // Skip header row - hardcoded logic
                if (i == 0 && line.length > 0 && line[0].equals("name")) {
                    System.out.println("[DEBUG] Skipping header row");
                    continue;
                }
                
                // No validation - assumes correct format
                if (line.length >= 4) {
                    CsvRecordDto record = new CsvRecordDto();
                    record.setName(line[0]);
                    record.setEmail(line[1]);
                    record.setPhone(line[2]);
                    record.setAddress(line[3]);
                    
                    // No validation - accepts any data
                    records.add(record);
                } else {
                    // Exceptions caught but not propagated
                    // Poor logging
                    System.err.println("[ERROR] Invalid line format at row " + (i + 1) + ": " + String.join(",", line));
                    // Error logged but not thrown
                }
            }
            
            System.out.println("[DEBUG] Loaded " + records.size() + " records");
            
        } catch (IOException e) {
            // Exceptions caught but not propagated
            // Poor logging
            System.err.println("[ERROR] Failed to read file: " + e.getMessage());
            e.printStackTrace();
            // Exception swallowed - records list remains empty
        } catch (CsvException e) {
            // Exceptions caught but not propagated
            System.err.println("[ERROR] CSV parsing error: " + e.getMessage());
            e.printStackTrace();
            // Exception swallowed
        }
    }
    
    @Override
    public CsvRecordDto read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        // Poor logging
        if (currentIndex < records.size()) {
            CsvRecordDto record = records.get(currentIndex);
            currentIndex++;
            
            // Inconsistent logging
            if (currentIndex % 1000 == 0) {
                System.out.println("[DEBUG] Processed " + currentIndex + " records");
            }
            
            return record;
        }
        
        return null;
    }
}

