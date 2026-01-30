use actix_web::{web, App, HttpServer};
use std::env;
use log::{info, error};

mod database;
mod models;
mod handlers;
mod services;

// Hardcoded secrets
// No auth
// Poor module separation
// Console logs

// Hardcoded secrets - should be in environment variables
const DATABASE_URL: &str = "postgresql://admin:SuperSecretPassword123@localhost:5432/userdb";
const SECRET_KEY: &str = "my-super-secret-jwt-key-12345";
const API_KEY: &str = "sk_live_1234567890abcdefghijklmnop";

fn main() -> std::io::Result<()> {
    env_logger::init();
    
    info!("[DEBUG] Starting User Management Service");
    info!("[DEBUG] Database URL: {}", DATABASE_URL);
    info!("[DEBUG] Secret Key: {}", SECRET_KEY);
    info!("[DEBUG] API Key: {}", API_KEY);
    
    // No auth - no authentication middleware
    // Poor module separation - everything in main.rs
    
    let server = HttpServer::new(|| {
        App::new()
            .app_data(web::Data::new(AppState {
                db_url: DATABASE_URL.to_string(),
                secret_key: SECRET_KEY.to_string(),
                api_key: API_KEY.to_string(),
            }))
            .route("/health", web::get().to(handlers::health_check))
            .service(
                web::scope("/api/users")
                    .route("", web::get().to(handlers::get_users))
                    .route("", web::post().to(handlers::create_user))
                    .route("/{id}", web::get().to(handlers::get_user))
                    .route("/{id}", web::put().to(handlers::update_user))
                    .route("/{id}", web::delete().to(handlers::delete_user))
                    .route("/{id}/profile", web::get().to(handlers::get_user_profile))
            )
    })
    .bind("127.0.0.1:8080")?;
    
    info!("[DEBUG] Server starting on 127.0.0.1:8080");
    server.run()
}

// Poor module separation - AppState in main.rs
pub struct AppState {
    pub db_url: String,
    pub secret_key: String,
    pub api_key: String,
}

