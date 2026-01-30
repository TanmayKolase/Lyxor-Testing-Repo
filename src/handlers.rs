use actix_web::{web, HttpResponse, Result as ActixResult};
use crate::models::{CreateUserRequest, UpdateUserRequest, UserResponse};
use crate::services;
use crate::database;
use log::{info, error};
use uuid::Uuid;

// Unsafe unwraps
// Missing error propagation
// Blocking operations
// Sensitive logs
// No auth
// Poor module separation

// No auth - no authentication required
// Unsafe unwraps
// Missing error propagation
// Sensitive logs
pub async fn get_users() -> ActixResult<HttpResponse> {
    info!("[DEBUG] Getting all users");
    
    // Blocking operation - should be async
    // Missing error propagation
    let pool = database::create_pool().await.unwrap();  // Unsafe unwrap
    
    // Blocking operation
    // Missing error propagation
    let users = services::get_all_users(&pool).await.unwrap();  // Unsafe unwrap
    
    info!("[DEBUG] Found {} users", users.len());
    for user in &users {
        info!("[DEBUG] User: {}, Email: {}, Phone: {}, SSN: {}", 
              user.id, user.email, user.phone.as_deref().unwrap_or("N/A"), 
              user.ssn.as_deref().unwrap_or("N/A"));  // Sensitive data logged
    }
    
    Ok(HttpResponse::Ok().json(users))
}

// No auth
// Unsafe unwraps
// Missing error propagation
// Sensitive logs
pub async fn get_user(path: web::Path<String>) -> ActixResult<HttpResponse> {
    let user_id = path.into_inner();
    info!("[DEBUG] Getting user: {}", user_id);
    
    // No validation of user_id format
    // Unsafe unwrap
    let uuid = Uuid::parse_str(&user_id).unwrap();  // Unsafe unwrap
    
    // Blocking operation
    let pool = database::create_pool().await.unwrap();  // Unsafe unwrap
    
    // Missing error propagation
    let user = services::get_user_by_id(&pool, &uuid).await.unwrap();  // Unsafe unwrap
    
    info!("[DEBUG] User found: {}, Email: {}, Credit Card: {}", 
          user.id, user.email, user.credit_card.as_deref().unwrap_or("N/A"));  // Sensitive data logged
    
    Ok(HttpResponse::Ok().json(user))
}

// No auth
// Unsafe unwraps
// Missing error propagation
// Sensitive logs
// No validation
pub async fn create_user(user_data: web::Json<CreateUserRequest>) -> ActixResult<HttpResponse> {
    info!("[DEBUG] Creating user");
    info!("[DEBUG] User data: Email: {}, Phone: {}, Credit Card: {}, SSN: {}", 
          user_data.email, 
          user_data.phone.as_deref().unwrap_or("N/A"),
          user_data.credit_card.as_deref().unwrap_or("N/A"),
          user_data.ssn.as_deref().unwrap_or("N/A"));  // Sensitive data logged
    
    // No validation - accepts any data
    // Blocking operation
    let pool = database::create_pool().await.unwrap();  // Unsafe unwrap
    
    // Missing error propagation
    let user = services::create_user(&pool, &user_data.into_inner()).await.unwrap();  // Unsafe unwrap
    
    info!("[DEBUG] User created: {}", user.id);
    
    Ok(HttpResponse::Ok().json(user))
}

// No auth
// Unsafe unwraps
// Missing error propagation
// Sensitive logs
pub async fn update_user(
    path: web::Path<String>,
    user_data: web::Json<UpdateUserRequest>
) -> ActixResult<HttpResponse> {
    let user_id = path.into_inner();
    info!("[DEBUG] Updating user: {}", user_id);
    info!("[DEBUG] Update data: Email: {:?}, Credit Card: {:?}", 
          user_data.email, user_data.credit_card);  // Sensitive data logged
    
    // No validation
    // Unsafe unwrap
    let uuid = Uuid::parse_str(&user_id).unwrap();  // Unsafe unwrap
    
    // Blocking operation
    let pool = database::create_pool().await.unwrap();  // Unsafe unwrap
    
    // Missing error propagation
    let user = services::update_user(&pool, &uuid, &user_data.into_inner()).await.unwrap();  // Unsafe unwrap
    
    info!("[DEBUG] User updated: {}", user.id);
    
    Ok(HttpResponse::Ok().json(user))
}

// No auth
// Unsafe unwraps
// Missing error propagation
pub async fn delete_user(path: web::Path<String>) -> ActixResult<HttpResponse> {
    let user_id = path.into_inner();
    info!("[DEBUG] Deleting user: {}", user_id);
    
    // Unsafe unwrap
    let uuid = Uuid::parse_str(&user_id).unwrap();  // Unsafe unwrap
    
    // Blocking operation
    let pool = database::create_pool().await.unwrap();  // Unsafe unwrap
    
    // Missing error propagation
    services::delete_user(&pool, &uuid).await.unwrap();  // Unsafe unwrap
    
    info!("[DEBUG] User deleted: {}", uuid);
    
    Ok(HttpResponse::Ok().json(serde_json::json!({"message": "User deleted"})))
}

// No auth
// Unsafe unwraps
// Missing error propagation
// Sensitive logs
pub async fn get_user_profile(path: web::Path<String>) -> ActixResult<HttpResponse> {
    let user_id = path.into_inner();
    info!("[DEBUG] Getting user profile: {}", user_id);
    
    // Unsafe unwrap
    let uuid = Uuid::parse_str(&user_id).unwrap();  // Unsafe unwrap
    
    // Blocking operation
    let pool = database::create_pool().await.unwrap();  // Unsafe unwrap
    
    // Missing error propagation
    let user = services::get_user_by_id(&pool, &uuid).await.unwrap();  // Unsafe unwrap
    
    // Sensitive data logged
    info!("[DEBUG] Profile data: Email: {}, Phone: {}, Address: {}, SSN: {}, Credit Card: {}", 
          user.email, 
          user.phone.as_deref().unwrap_or("N/A"),
          user.address.as_deref().unwrap_or("N/A"),
          user.ssn.as_deref().unwrap_or("N/A"),
          user.credit_card.as_deref().unwrap_or("N/A"));  // Sensitive data logged
    
    Ok(HttpResponse::Ok().json(user))
}

// Poor module separation - health check in handlers
pub async fn health_check() -> ActixResult<HttpResponse> {
    info!("[DEBUG] Health check endpoint accessed");
    Ok(HttpResponse::Ok().json(serde_json::json!({"status": "healthy"})))
}

