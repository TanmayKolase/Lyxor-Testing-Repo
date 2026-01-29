package com.example.employeemanagement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

// Hardcoded admin credentials - should be in secure vault or environment variables
@Configuration
public class AdminConfig {
    
    // Hardcoded admin credentials from properties file
    @Value("${app.admin.username}")
    private String adminUsername;
    
    @Value("${app.admin.password}")
    private String adminPassword;
    
    @Value("${app.admin.email}")
    private String adminEmail;
    
    // Hardcoded admin credentials in code - security issue
    private static final String DEFAULT_ADMIN_USERNAME = "admin";
    private static final String DEFAULT_ADMIN_PASSWORD = "admin123";
    
    public String getAdminUsername() {
        return adminUsername != null ? adminUsername : DEFAULT_ADMIN_USERNAME;
    }
    
    public String getAdminPassword() {
        return adminPassword != null ? adminPassword : DEFAULT_ADMIN_PASSWORD;
    }
    
    public String getAdminEmail() {
        return adminEmail;
    }
    
    // Method to verify admin credentials - but never actually used for authentication
    public boolean isAdmin(String username, String password) {
        return DEFAULT_ADMIN_USERNAME.equals(username) && 
               DEFAULT_ADMIN_PASSWORD.equals(password);
    }
}

