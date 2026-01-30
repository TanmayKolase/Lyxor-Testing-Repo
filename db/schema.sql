-- User database schema
-- Missing indexes for performance

CREATE DATABASE IF NOT EXISTS userdb;
USE userdb;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    -- Note: password should be hashed, but currently stored in plain text
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -- Missing index on email (frequently queried)
    -- Missing unique constraint on email
);

-- Sample data (for testing only)
INSERT INTO users (email, name, phone, password, address, date_of_birth) VALUES
('john@example.com', 'John Doe', '555-1234', 'password123', '123 Main St', '1990-01-01'),
('jane@example.com', 'Jane Smith', '555-5678', 'password456', '456 Oak Ave', '1992-05-15');

