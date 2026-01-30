package com.example.import;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ImportApplication {
    public static void main(String[] args) {
        System.out.println("[DEBUG] Starting Import Application");
        SpringApplication.run(ImportApplication.class, args);
        System.out.println("[DEBUG] Application started");
    }
}

