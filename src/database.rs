use sqlx::{PgPool, PgConnection, Connection};
use std::env;
use log::{info, error};

// Hardcoded secrets
// Blocking operations
// Console logs

// Hardcoded connection string - should be in environment variables
const DATABASE_URL: &str = "postgresql://admin:SuperSecretPassword123@localhost:5432/userdb";

pub async fn create_pool() -> Result<PgPool, sqlx::Error> {
    info!("[DEBUG] Creating database pool");
    info!("[DEBUG] Database URL: {}", DATABASE_URL);
    
    // Blocking operation - should use async properly
    // Hardcoded URL
    let pool = PgPool::connect(DATABASE_URL).await?;
    
    info!("[DEBUG] Database pool created");
    Ok(pool)
}

// Blocking operation - synchronous function
// Poor module separation
pub fn get_connection_sync() -> Result<PgConnection, sqlx::Error> {
    info!("[DEBUG] Getting synchronous database connection");
    
    // Blocking operation - synchronous connection
    // This blocks the async runtime
    let rt = tokio::runtime::Runtime::new().unwrap();  // Unsafe unwrap
    rt.block_on(async {
        let mut conn = PgConnection::connect(DATABASE_URL).await?;
        Ok(conn)
    })
}

