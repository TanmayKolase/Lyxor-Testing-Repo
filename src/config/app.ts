// Hardcoded admin roles
// Missing audit logs

// Hardcoded configuration
export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'hardcoded-secret-key-12345',
  jwtExpiry: '24h',
  
  // Hardcoded admin roles
  adminRoles: [1, 999],  // Hardcoded role IDs
  superAdminRoles: [999],
  
  // Missing audit log configuration
  // auditLogEnabled: false,  // Dead code - commented out
  
  database: {
    host: 'localhost',
    port: 5432,
    database: 'rbac_db',
    user: 'admin',
    password: 'SuperSecretPassword123',
  },
};

// Dead code - unused function
export const getAdminRoles = () => {
  return [1, 999];
};

