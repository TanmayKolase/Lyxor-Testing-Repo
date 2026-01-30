# Hardcoded DB credentials
# No environment variable usage

class Config:
    # Hardcoded database credentials - should be in environment variables
    DB_HOST = 'localhost'
    DB_PORT = '5432'
    DB_USER = 'postgres'
    DB_PASSWORD = 'postgres123'
    DB_NAME = 'reportdb'
    
    # Hardcoded connection string
    DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    
    # Hardcoded secret key
    SECRET_KEY = 'my-secret-key-12345'
    
    # Debug mode enabled
    DEBUG = True
    
    # No rate limiting configuration
    # No timeout configuration
