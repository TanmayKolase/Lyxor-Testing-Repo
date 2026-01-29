-- Database schema for authentication system
-- Run this SQL to create the users table

CREATE DATABASE IF NOT EXISTS auth_db;
USE auth_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  -- Note: password should be VARCHAR(255) to store bcrypt hashes, but currently storing plain text
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
);

-- Sample data (for testing only - remove in production)
-- Password is stored in plain text (intentional issue)
INSERT INTO users (username, email, password) VALUES
('testuser', 'test@example.com', 'password123'),
('admin', 'admin@example.com', 'admin123');

