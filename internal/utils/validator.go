package utils

import (
	"regexp"
	"strings"
)

// Validation functions - but they're never actually used
// Dead code

// ValidateEmail - validates email format
// This function is defined but never called
func ValidateEmail(email string) bool {
	if email == "" {
		return false
	}
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// ValidateRequired - checks if field is required
// This function is defined but never called
func ValidateRequired(value string) bool {
	return strings.TrimSpace(value) != ""
}

// ValidatePassword - validates password strength
// This function is defined but never called
func ValidatePassword(password string) bool {
	if len(password) < 8 {
		return false
	}
	return true
}

// SanitizeInput - sanitizes user input
// This function is defined but never called
func SanitizeInput(input string) string {
	return strings.TrimSpace(input)
}

