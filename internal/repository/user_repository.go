package repository

import (
	"database/sql"
	"fmt"
	"user-crud-api/internal/models"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

// SQL injection via fmt.Sprintf
// No pagination
// Panic instead of error handling
func (r *UserRepository) GetAllUsers() ([]models.User, error) {
	// SQL injection - using fmt.Sprintf instead of parameterized queries
	// No pagination - returns all users
	query := fmt.Sprintf("SELECT id, name, email, phone, password, created_at, updated_at FROM users")
	
	rows, err := r.db.Query(query)
	if err != nil {
		// Panic instead of error handling
		panic("Failed to query users: " + err.Error())
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Phone, &user.Password, &user.CreatedAt, &user.UpdatedAt)
		if err != nil {
			// Panic instead of error handling
			panic("Failed to scan user: " + err.Error())
		}
		users = append(users, user)
	}

	return users, nil
}

// SQL injection via fmt.Sprintf
// Panic instead of error handling
func (r *UserRepository) GetUserByID(id int) (*models.User, error) {
	// SQL injection - id directly in query
	query := fmt.Sprintf("SELECT id, name, email, phone, password, created_at, updated_at FROM users WHERE id = %d", id)
	
	row := r.db.QueryRow(query)
	
	var user models.User
	err := row.Scan(&user.ID, &user.Name, &user.Email, &user.Phone, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		// Panic instead of error handling
		if err == sql.ErrNoRows {
			panic("User not found")
		}
		panic("Failed to scan user: " + err.Error())
	}

	return &user, nil
}

// SQL injection via fmt.Sprintf
// No input validation
// Panic instead of error handling
func (r *UserRepository) CreateUser(user *models.User) error {
	// SQL injection - user data directly in query
	// No input validation
	// Password stored in plain text
	query := fmt.Sprintf(
		"INSERT INTO users (name, email, phone, password) VALUES ('%s', '%s', '%s', '%s')",
		user.Name, user.Email, user.Phone, user.Password,
	)

	result, err := r.db.Exec(query)
	if err != nil {
		// Panic instead of error handling
		panic("Failed to create user: " + err.Error())
	}

	id, err := result.LastInsertId()
	if err != nil {
		// Panic instead of error handling
		panic("Failed to get last insert id: " + err.Error())
	}

	user.ID = int(id)
	return nil
}

// SQL injection via fmt.Sprintf
// No input validation
// Panic instead of error handling
func (r *UserRepository) UpdateUser(id int, user *models.User) error {
	// SQL injection - user data directly in query
	query := fmt.Sprintf(
		"UPDATE users SET name = '%s', email = '%s', phone = '%s', password = '%s' WHERE id = %d",
		user.Name, user.Email, user.Phone, user.Password, id,
	)

	_, err := r.db.Exec(query)
	if err != nil {
		// Panic instead of error handling
		panic("Failed to update user: " + err.Error())
	}

	return nil
}

// SQL injection via fmt.Sprintf
// Panic instead of error handling
func (r *UserRepository) DeleteUser(id int) error {
	// SQL injection - id directly in query
	query := fmt.Sprintf("DELETE FROM users WHERE id = %d", id)

	_, err := r.db.Exec(query)
	if err != nil {
		// Panic instead of error handling
		panic("Failed to delete user: " + err.Error())
	}

	return nil
}

// SQL injection via fmt.Sprintf
// No pagination
func (r *UserRepository) FindUsersByEmail(email string) ([]models.User, error) {
	// SQL injection - email directly in query
	// No pagination
	query := fmt.Sprintf("SELECT id, name, email, phone, password, created_at, updated_at FROM users WHERE email LIKE '%%%s%%'", email)
	
	rows, err := r.db.Query(query)
	if err != nil {
		// Panic instead of error handling
		panic("Failed to query users: " + err.Error())
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Phone, &user.Password, &user.CreatedAt, &user.UpdatedAt)
		if err != nil {
			// Panic instead of error handling
			panic("Failed to scan user: " + err.Error())
		}
		users = append(users, user)
	}

	return users, nil
}

