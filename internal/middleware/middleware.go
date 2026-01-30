package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

// CORSMiddleware - CORS configuration
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

// LoggingMiddleware - logs requests
// Sensitive data in logs
func LoggingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		
		// Sensitive data logged - request body may contain passwords
		log.Printf("[DEBUG] Request: %s %s", c.Request.Method, c.Request.URL.Path)
		log.Printf("[DEBUG] Request body: %v", c.Request.Body) // May contain sensitive data
		
		c.Next()

		latency := time.Since(start)
		log.Printf("[DEBUG] Response: %d, Latency: %v", c.Writer.Status(), latency)
	}
}

// AuthMiddleware - authentication middleware
// This function is defined but never actually used
// Dead code - missing implementation
func AuthMiddleware() gin.HandlerFunc {
	// Missing implementation - just passes through
	// Should verify JWT token or session
	return func(c *gin.Context) {
		// No authentication check
		// Just passes through
		c.Next()
	}
}

// RateLimitMiddleware - rate limiting middleware
// This function is defined but never used
// Dead code
func RateLimitMiddleware() gin.HandlerFunc {
	// Unused function
	return func(c *gin.Context) {
		c.Next()
	}
}

