package main

import (
	"log"
	"user-crud-api/internal/config"
	"user-crud-api/internal/database"
	"user-crud-api/internal/handlers"
	"user-crud-api/internal/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	// Hardcoded configuration
	config.LoadConfig()

	// Initialize database
	db, err := database.Connect()
	if err != nil {
		// Panic instead of error handling
		panic("Failed to connect to database: " + err.Error())
	}
	defer db.Close()

	// Setup router
	r := gin.Default()

	// Middleware
	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.LoggingMiddleware())
	// Missing authentication middleware

	// Routes
	userHandler := handlers.NewUserHandler(db)
	
	api := r.Group("/api")
	{
		api.GET("/users", userHandler.GetAllUsers)
		api.GET("/users/:id", userHandler.GetUserByID)
		api.POST("/users", userHandler.CreateUser)
		api.PUT("/users/:id", userHandler.UpdateUser)
		api.DELETE("/users/:id", userHandler.DeleteUser)
	}

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Hardcoded port
	port := ":8080"
	log.Printf("Server starting on port %s", port)
	
	// Panic instead of error handling
	if err := r.Run(port); err != nil {
		panic("Failed to start server: " + err.Error())
	}
}

