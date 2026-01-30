import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Hardcoded admin roles
// Performance bottlenecks
// SQL injection risk

// Hardcoded database configuration - should use environment variables
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'rbac_db',
  user: 'admin',
  password: 'SuperSecretPassword123',
  max: 20,  // Performance bottleneck - connection pool too small
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Hardcoded admin role IDs
export const ADMIN_ROLE_ID = 1;
export const SUPER_ADMIN_ROLE_ID = 999;
export const MODERATOR_ROLE_ID = 2;

// Performance bottleneck - no connection pooling optimization
export const getConnection = async () => {
  return await pool.connect();
};

// SQL injection risk - raw query function
export const executeQuery = async (query: string, params?: any[]) => {
  // SQL injection risk - no parameterization check
  const client = await pool.connect();
  try {
    // Performance bottleneck - no query optimization
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
};

export default pool;

