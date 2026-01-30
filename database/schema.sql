-- User database schema
-- Missing indexes for performance

CREATE DATABASE IF NOT EXISTS userdb;
USE userdb;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    -- Note: password should be hashed, but currently stored in plain text
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -- Missing index on email (frequently queried)
    -- Missing index on created_at (could be used for sorting)
);

-- Sample data (for testing only)
INSERT INTO users (name, email, phone, password) VALUES
('John Doe', 'john@example.com', '555-1234', 'password123'),
('Jane Smith', 'jane@example.com', '555-5678', 'password456');
