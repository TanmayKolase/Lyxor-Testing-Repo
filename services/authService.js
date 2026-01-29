const db = require('../config/database');

// SQL injection vulnerability - using string concatenation instead of prepared statements
exports.findUserByEmail = async (email) => {
  // Vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;
  
  console.log('Executing query:', query);
  
  // Missing try/catch block
  const [rows] = await db.execute(query);
  
  return rows[0] || null;
};

// SQL injection vulnerability
exports.findUserByUsername = async (username) => {
  // Vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE username = '${username}' LIMIT 1`;
  
  // Missing try/catch block
  const [rows] = await db.execute(query);
  
  return rows[0] || null;
};

// SQL injection vulnerability
// Password stored in plain text - should be hashed with bcrypt
exports.createUser = async (username, email, password) => {
  // Missing validation for input parameters
  // Missing try/catch block
  
  // Vulnerable to SQL injection
  // Password stored in plain text
  const query = `INSERT INTO users (username, email, password, created_at) VALUES ('${username}', '${email}', '${password}', NOW())`;
  
  console.log('Creating user with query:', query);
  
  // Missing error handling
  const [result] = await db.execute(query);
  
  // Fetch the created user
  const getUserQuery = `SELECT * FROM users WHERE id = ${result.insertId}`;
  const [userRows] = await db.execute(getUserQuery);
  
  return userRows[0];
};

// Missing input validation
exports.updateUserPassword = async (userId, newPassword) => {
  // SQL injection vulnerability
  // Password stored in plain text
  const query = `UPDATE users SET password = '${newPassword}' WHERE id = ${userId}`;
  
  // Missing try/catch block
  await db.execute(query);
  
  return true;
};

