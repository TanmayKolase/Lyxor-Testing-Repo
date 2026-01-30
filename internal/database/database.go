package database

import (
	"database/sql"
	"fmt"
	"log"
	"user-crud-api/internal/config"

	_ "github.com/go-sql-driver/mysql"
)

// Connect establishes database connection
// Hardcoded credentials
// Panic instead of error handling
func Connect() (*sql.DB, error) {
	// Hardcoded connection string
	// SQL injection risk in connection string construction
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.DBUser,
		config.DBPassword,
		config.DBHost,
		config.DBPort,
		config.DBName,
	)

	log.Printf("[DEBUG] Connecting to database: %s@%s:%s/%s", 
		config.DBUser, config.DBHost, config.DBPort, config.DBName) // Sensitive data logged

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		// Panic instead of error handling
		panic("Failed to open database: " + err.Error())
	}

	// Test connection
	if err := db.Ping(); err != nil {
		// Panic instead of error handling
		panic("Failed to ping database: " + err.Error())
	}

	log.Println("Database connected successfully")
	return db, nil
}

