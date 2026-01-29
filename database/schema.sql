-- Sales Reporting Database Schema
-- Missing indexes - performance risk
-- Hardcoded table names in application

-- Sales table - missing indexes on frequently queried columns
CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Missing index on customer_id (frequently used in JOINs)
    -- Missing index on product_id (frequently used in JOINs)
    -- Missing index on created_at (frequently used in WHERE clauses)
    -- Missing index on status (frequently used in WHERE clauses)
);

-- Products table - missing indexes
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Missing index on category (frequently used in WHERE clauses)
);

-- Customers table - missing indexes
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    region_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Missing index on region_id (frequently used in JOINs)
    -- Missing index on email (could be used for lookups)
);

-- Regions table
CREATE TABLE IF NOT EXISTS regions (
    id SERIAL PRIMARY KEY,
    region_name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table (if needed)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Missing index on customer_id
    -- Missing index on created_at
    -- Missing index on status
);

-- Sample data (for testing)
INSERT INTO regions (region_name, country) VALUES
('North America', 'USA'),
('North America', 'Canada'),
('Europe', 'UK'),
('Europe', 'Germany'),
('Asia', 'Japan'),
('Asia', 'China')
ON CONFLICT DO NOTHING;
