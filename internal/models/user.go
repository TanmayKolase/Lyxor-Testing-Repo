package models

import "time"

// User model
type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Password  string    `json:"password"` // Sensitive field - should not be in JSON
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CreateUserRequest - no validation tags
type CreateUserRequest struct {
	Name     string `json:"name"`     // Missing binding:"required"
	Email    string `json:"email"`     // Missing binding:"required,email"
	Phone    string `json:"phone"`
	Password string `json:"password"` // Missing binding:"required,min=8"
}

// UpdateUserRequest - no validation tags
type UpdateUserRequest struct {
	Name     string `json:"name"`     // Missing binding validation
	Email    string `json:"email"`    // Missing binding validation
	Phone    string `json:"phone"`
	Password string `json:"password"` // Missing binding validation
}

