package handlers

import (
	"database/sql"
	"net/http"
	"strconv"
	"user-crud-api/internal/models"
	"user-crud-api/internal/repository"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	repo *repository.UserRepository
}

func NewUserHandler(db *sql.DB) *UserHandler {
	return &UserHandler{
		repo: repository.NewUserRepository(db),
	}
}

// No authentication middleware
// No pagination
// Panic instead of error handling
// Sensitive data in logs
func (h *UserHandler) GetAllUsers(c *gin.Context) {
	// No authentication check
	// No pagination parameters
	
	// Panic instead of error handling - no try/catch equivalent
	users, err := h.repo.GetAllUsers()
	if err != nil {
		// Panic instead of proper error handling
		panic("Failed to get users: " + err.Error())
	}

	// Sensitive data logged - passwords exposed
	for _, user := range users {
		gin.DefaultWriter.Write([]byte("User: " + user.Email + ", Password: " + user.Password + "\n"))
	}

	// Sensitive data returned - passwords exposed
	c.JSON(http.StatusOK, gin.H{
		"users": users, // Passwords included in response
	})
}

// No authentication middleware
// Panic instead of error handling
// Sensitive data in logs
func (h *UserHandler) GetUserByID(c *gin.Context) {
	// No authentication check
	
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		// Panic instead of error handling
		panic("Invalid user ID: " + err.Error())
	}

	// Panic instead of error handling
	user, err := h.repo.GetUserByID(id)
	if err != nil {
		// Panic instead of proper error handling
		panic("Failed to get user: " + err.Error())
	}

	// Sensitive data logged
	gin.DefaultWriter.Write([]byte("User password: " + user.Password + "\n"))

	// Sensitive data returned
	c.JSON(http.StatusOK, gin.H{
		"user": user, // Password included in response
	})
}

// No input validation
// No authentication middleware
// Panic instead of error handling
// Sensitive data in logs
func (h *UserHandler) CreateUser(c *gin.Context) {
	// No authentication check
	// No input validation
	
	var req models.CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		// Panic instead of error handling
		panic("Invalid request: " + err.Error())
	}

	// No validation - empty fields allowed
	// Sensitive data logged
	gin.DefaultWriter.Write([]byte("Creating user with password: " + req.Password + "\n"))

	user := &models.User{
		Name:     req.Name,
		Email:    req.Email,
		Phone:    req.Phone,
		Password: req.Password, // Stored in plain text
	}

	// Panic instead of error handling
	if err := h.repo.CreateUser(user); err != nil {
		// Panic instead of proper error handling
		panic("Failed to create user: " + err.Error())
	}

	// Sensitive data returned
	c.JSON(http.StatusCreated, gin.H{
		"user": user, // Password included in response
	})
}

// No input validation
// No authentication middleware
// Panic instead of error handling
// Sensitive data in logs
func (h *UserHandler) UpdateUser(c *gin.Context) {
	// No authentication check
	// No input validation
	
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		// Panic instead of error handling
		panic("Invalid user ID: " + err.Error())
	}

	var req models.UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		// Panic instead of error handling
		panic("Invalid request: " + err.Error())
	}

	// No validation
	// Sensitive data logged
	gin.DefaultWriter.Write([]byte("Updating user with new password: " + req.Password + "\n"))

	user := &models.User{
		Name:     req.Name,
		Email:    req.Email,
		Phone:    req.Phone,
		Password: req.Password, // Stored in plain text
	}

	// Panic instead of error handling
	if err := h.repo.UpdateUser(id, user); err != nil {
		// Panic instead of proper error handling
		panic("Failed to update user: " + err.Error())
	}

	// Sensitive data returned
	c.JSON(http.StatusOK, gin.H{
		"user": user, // Password included in response
	})
}

// No authentication middleware
// Panic instead of error handling
func (h *UserHandler) DeleteUser(c *gin.Context) {
	// No authentication check
	
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		// Panic instead of error handling
		panic("Invalid user ID: " + err.Error())
	}

	// Panic instead of error handling
	if err := h.repo.DeleteUser(id); err != nil {
		// Panic instead of proper error handling
		panic("Failed to delete user: " + err.Error())
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User deleted successfully",
	})
}

