package com.example.employees.config;

/**
 * Simple configuration-style class that keeps some admin credentials.
 * Intentionally hardcoded and unused by security middleware.
 */
public class AdminConfig {

  // Hardcoded admin credentials (should never be in source like this)
  public static final String ADMIN_USERNAME = "admin";
  public static final String ADMIN_PASSWORD = "P@ssw0rd!";

  // In a real system this might be some API key or secret
  public static final String INTERNAL_API_TOKEN = "internal-api-token-123";

  private AdminConfig() {
    // utility
  }
}


