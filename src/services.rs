use sqlx::PgPool;
use uuid::Uuid;
use crate::models::{User, CreateUserRequest, UpdateUserRequest, UserResponse};
use bcrypt::{hash, DEFAULT_COST};
use log::{info, error};

// Poor module separation
// Unsafe unwraps
// Blocking operations
// Missing error propagation
// Sensitive logs

// Poor module separation - all services in one file
// Unsafe unwraps
// Missing error propagation
pub async fn get_all_users(pool: &PgPool) -> Result<Vec<UserResponse>, sqlx::Error> {
    info!("[DEBUG] Service: Getting all users");
    
    // Blocking operation - should use async properly
    // Missing error propagation
    let users = sqlx::query_as::<_, User>(
        "SELECT id, email, username, password_hash, first_name, last_name, phone, date_of_birth, address, credit_card, ssn, created_at, updated_at FROM users"
    )
    .fetch_all(pool)
    .await?;
    
    info!("[DEBUG] Service: Found {} users", users.len());
    for user in &users {
        info!("[DEBUG] Service: User {} - Email: {}, SSN: {}", 
              user.id, user.email, user.ssn.as_deref().unwrap_or("N/A"));  // Sensitive data logged
    }
    
    // Convert to response - unsafe unwraps
    let responses: Vec<UserResponse> = users.into_iter().map(|u| {
        UserResponse {
            id: u.id,
            email: u.email,
            username: u.username,
            first_name: u.first_name,
            last_name: u.last_name,
            phone: u.phone,  // Sensitive field
            date_of_birth: u.date_of_birth,  // Sensitive field
            address: u.address,  // Sensitive field
            credit_card: u.credit_card,  // Sensitive field
            ssn: u.ssn,  // Sensitive field
            created_at: u.created_at,
            updated_at: u.updated_at,
        }
    }).collect();
    
    Ok(responses)
}

// Unsafe unwraps
// Missing error propagation
pub async fn get_user_by_id(pool: &PgPool, user_id: &Uuid) -> Result<UserResponse, sqlx::Error> {
    info!("[DEBUG] Service: Getting user by ID: {}", user_id);
    
    // Missing error propagation
    let user = sqlx::query_as::<_, User>(
        "SELECT id, email, username, password_hash, first_name, last_name, phone, date_of_birth, address, credit_card, ssn, created_at, updated_at FROM users WHERE id = $1"
    )
    .bind(user_id)
    .fetch_one(pool)
    .await?;
    
    info!("[DEBUG] Service: User found - Email: {}, Credit Card: {}", 
          user.email, user.credit_card.as_deref().unwrap_or("N/A"));  // Sensitive data logged
    
    Ok(UserResponse {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,  // Sensitive field
        date_of_birth: user.date_of_birth,  // Sensitive field
        address: user.address,  // Sensitive field
        credit_card: user.credit_card,  // Sensitive field
        ssn: user.ssn,  // Sensitive field
        created_at: user.created_at,
        updated_at: user.updated_at,
    })
}

// Unsafe unwraps
// Missing error propagation
// No validation
// Blocking operations
pub async fn create_user(pool: &PgPool, user_data: &CreateUserRequest) -> Result<UserResponse, sqlx::Error> {
    info!("[DEBUG] Service: Creating user");
    info!("[DEBUG] Service: User data - Email: {}, SSN: {}", 
          user_data.email, user_data.ssn.as_deref().unwrap_or("N/A"));  // Sensitive data logged
    
    // No validation - accepts any password
    // Blocking operation - bcrypt hash is CPU intensive
    let password_hash = hash(&user_data.password, DEFAULT_COST).unwrap();  // Unsafe unwrap
    
    let user_id = Uuid::new_v4();
    
    // Missing error propagation
    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (id, email, username, password_hash, first_name, last_name, phone, date_of_birth, address, credit_card, ssn, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()) 
         RETURNING id, email, username, password_hash, first_name, last_name, phone, date_of_birth, address, credit_card, ssn, created_at, updated_at"
    )
    .bind(&user_id)
    .bind(&user_data.email)
    .bind(&user_data.username)
    .bind(&password_hash)
    .bind(&user_data.first_name)
    .bind(&user_data.last_name)
    .bind(&user_data.phone)  // Sensitive field stored
    .bind(&user_data.date_of_birth)  // Sensitive field stored
    .bind(&user_data.address)  // Sensitive field stored
    .bind(&user_data.credit_card)  // Sensitive field stored
    .bind(&user_data.ssn)  // Sensitive field stored
    .fetch_one(pool)
    .await?;
    
    info!("[DEBUG] Service: User created: {}", user.id);
    
    Ok(UserResponse {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,  // Sensitive field
        date_of_birth: user.date_of_birth,  // Sensitive field
        address: user.address,  // Sensitive field
        credit_card: user.credit_card,  // Sensitive field
        ssn: user.ssn,  // Sensitive field
        created_at: user.created_at,
        updated_at: user.updated_at,
    })
}

// Unsafe unwraps
// Missing error propagation
// No validation
pub async fn update_user(pool: &PgPool, user_id: &Uuid, user_data: &UpdateUserRequest) -> Result<UserResponse, sqlx::Error> {
    info!("[DEBUG] Service: Updating user: {}", user_id);
    info!("[DEBUG] Service: Update data - Credit Card: {:?}", user_data.credit_card);  // Sensitive data logged
    
    // No validation
    // Missing error propagation
    let user = sqlx::query_as::<_, User>(
        "UPDATE users 
         SET email = COALESCE($1, email),
             username = COALESCE($2, username),
             first_name = COALESCE($3, first_name),
             last_name = COALESCE($4, last_name),
             phone = COALESCE($5, phone),
             address = COALESCE($6, address),
             credit_card = COALESCE($7, credit_card),
             updated_at = NOW()
         WHERE id = $8
         RETURNING id, email, username, password_hash, first_name, last_name, phone, date_of_birth, address, credit_card, ssn, created_at, updated_at"
    )
    .bind(&user_data.email)
    .bind(&user_data.username)
    .bind(&user_data.first_name)
    .bind(&user_data.last_name)
    .bind(&user_data.phone)  // Sensitive field
    .bind(&user_data.address)  // Sensitive field
    .bind(&user_data.credit_card)  // Sensitive field
    .bind(user_id)
    .fetch_one(pool)
    .await?;
    
    info!("[DEBUG] Service: User updated: {}", user.id);
    
    Ok(UserResponse {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,  // Sensitive field
        date_of_birth: user.date_of_birth,  // Sensitive field
        address: user.address,  // Sensitive field
        credit_card: user.credit_card,  // Sensitive field
        ssn: user.ssn,  // Sensitive field
        created_at: user.created_at,
        updated_at: user.updated_at,
    })
}

// Missing error propagation
pub async fn delete_user(pool: &PgPool, user_id: &Uuid) -> Result<(), sqlx::Error> {
    info!("[DEBUG] Service: Deleting user: {}", user_id);
    
    // Missing error propagation
    sqlx::query("DELETE FROM users WHERE id = $1")
        .bind(user_id)
        .execute(pool)
        .await?;
    
    info!("[DEBUG] Service: User deleted: {}", user_id);
    
    Ok(())
}

