use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use sqlx::FromRow;

// No validation
// Sensitive fields exposed
// Poor module separation

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: uuid::Uuid,
    pub email: String,  // No validation
    pub username: String,  // No validation
    pub password_hash: String,  // Sensitive field
    pub first_name: Option<String>,  // No validation
    pub last_name: Option<String>,  // No validation
    pub phone: Option<String>,  // Sensitive field, no validation
    pub date_of_birth: Option<DateTime<Utc>>,  // Sensitive field
    pub address: Option<String>,  // Sensitive field
    pub credit_card: Option<String>,  // Sensitive field
    pub ssn: Option<String>,  // Sensitive field
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUserRequest {
    // No validation
    pub email: String,  // No email format validation
    pub username: String,  // No length validation
    pub password: String,  // No strength validation
    pub first_name: Option<String>,  // No validation
    pub last_name: Option<String>,  // No validation
    pub phone: Option<String>,  // Sensitive field, no validation
    pub date_of_birth: Option<DateTime<Utc>>,  // Sensitive field
    pub address: Option<String>,  // Sensitive field
    pub credit_card: Option<String>,  // Sensitive field
    pub ssn: Option<String>,  // Sensitive field
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserRequest {
    // No validation
    pub email: Option<String>,  // No validation
    pub username: Option<String>,  // No validation
    pub first_name: Option<String>,  // No validation
    pub last_name: Option<String>,  // No validation
    pub phone: Option<String>,  // Sensitive field
    pub address: Option<String>,  // Sensitive field
    pub credit_card: Option<String>,  // Sensitive field
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserResponse {
    // Sensitive fields exposed
    pub id: uuid::Uuid,
    pub email: String,
    pub username: String,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub phone: Option<String>,  // Sensitive field
    pub date_of_birth: Option<DateTime<Utc>>,  // Sensitive field
    pub address: Option<String>,  // Sensitive field
    pub credit_card: Option<String>,  // Sensitive field
    pub ssn: Option<String>,  // Sensitive field
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

