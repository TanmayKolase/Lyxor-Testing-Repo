package com.example.import.config;

import com.example.import.dto.CsvRecordDto;
import com.example.import.entity.ImportRecord;
import com.example.import.processor.ImportRecordProcessor;
import com.example.import.reader.CsvItemReader;
import com.example.import.writer.ImportRecordWriter;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

// Missing transaction management
// No rollback on failed batch step
// Performance risk due to chunk size misconfiguration
// Poor and inconsistent logging

@Configuration
public class BatchConfig {
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private PlatformTransactionManager transactionManager;
    
    // Hardcoded file path - should be configurable
    @Value("${import.file.input.path:/tmp/import/data.csv}")
    private String inputFilePath;
    
    // Performance risk - chunk size misconfiguration
    // Too large chunk size can cause memory issues
    @Value("${spring.batch.chunk.size:10000}")
    private int chunkSize;
    
    // Poor logging
    public BatchConfig() {
        System.out.println("[DEBUG] BatchConfig initialized");
        System.out.println("[DEBUG] Input file path: " + inputFilePath);
        System.out.println("[DEBUG] Chunk size: " + chunkSize);
    }
    
    @Bean
    public ItemReader<CsvRecordDto> csvItemReader() {
        System.out.println("[DEBUG] Creating CSV item reader");
        // Hardcoded file path
        return new CsvItemReader(inputFilePath);
    }
    
    @Bean
    public ItemProcessor<CsvRecordDto, ImportRecord> importRecordProcessor() {
        System.out.println("[DEBUG] Creating import record processor");
        return new ImportRecordProcessor();
    }
    
    @Bean
    public ItemWriter<ImportRecord> importRecordWriter() {
        System.out.println("[DEBUG] Creating import record writer");
        return new ImportRecordWriter();
    }
    
    // Missing transaction management
    // No rollback configuration
    @Bean
    public Step importStep(ItemReader<CsvRecordDto> reader,
                          ItemProcessor<CsvRecordDto, ImportRecord> processor,
                          ItemWriter<ImportRecord> writer) {
        System.out.println("[DEBUG] Creating import step");
        System.out.println("[DEBUG] Chunk size: " + chunkSize);
        
        // Performance risk - chunk size too large
        // No transaction rollback on failure
        // Missing skip policy configuration
        return new StepBuilder("importStep", jobRepository)
                .<CsvRecordDto, ImportRecord>chunk(chunkSize, transactionManager)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                // No rollback on failure
                // No skip policy
                // No retry policy
                .build();
    }
    
    // No job status tracking
    @Bean
    public Job importJob(Step importStep) {
        System.out.println("[DEBUG] Creating import job");
        
        // No job status tracking
        // No job listeners
        return new JobBuilder("importJob", jobRepository)
                .start(importStep)
                // No job completion listener
                // No job failure listener
                .build();
    }
    
    // Performance risk - task executor not properly configured
    @Bean
    public TaskExecutor taskExecutor() {
        System.out.println("[DEBUG] Creating task executor");
        SimpleAsyncTaskExecutor executor = new SimpleAsyncTaskExecutor();
        executor.setConcurrencyLimit(10);  // Hardcoded limit
        return executor;
    }
}

