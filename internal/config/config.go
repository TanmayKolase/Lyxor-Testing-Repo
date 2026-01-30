package config

// Hardcoded database credentials - should be in environment variables
var (
	DBHost     = "localhost"
	DBPort     = "3306"
	DBUser     = "root"
	DBPassword = "password123"
	DBName     = "userdb"
	
	// Hardcoded server configuration
	ServerPort = "8080"
	
	// Hardcoded JWT secret
	JWTSecret = "my-secret-jwt-key-12345"
)

// LoadConfig loads configuration
// But all values are hardcoded - should read from environment
func LoadConfig() {
	// Configuration is hardcoded - no environment variable reading
	// Should use os.Getenv() or viper
}

