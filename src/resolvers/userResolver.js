const db = require('../config/database');

// No input validation in resolvers
// No auth guard on resolvers
// Over-fetching data
// Missing error handling
// Console logs in resolvers
// SQL injection risk

const userResolver = {
  // No authentication check
  // No input validation
  // Over-fetching - returns all fields including password
  // Missing error handling
  getUser: async (parent, args, context) => {
    console.log('[DEBUG] getUser resolver called with id:', args.id);
    
    // No authentication check
    // No input validation - id could be invalid
    
    // SQL injection risk - using string concatenation
    const query = `SELECT * FROM users WHERE id = ${args.id}`;
    
    try {
      // Missing error handling
      const [rows] = await db.query(query);
      
      if (rows.length === 0) {
        console.log('[DEBUG] User not found:', args.id);
        return null;
      }
      
      const user = rows[0];
      console.log('[DEBUG] User found:', user.email);
      
      // Over-fetching - returns password and all fields
      return user;
    } catch (error) {
      // Missing error handling - just logs
      console.error('[ERROR] Failed to get user:', error);
      throw error; // Throws raw error without formatting
    }
  },

  // No authentication check
  // No pagination
  // Over-fetching - returns all users with passwords
  // Missing error handling
  getAllUsers: async (parent, args, context) => {
    console.log('[DEBUG] getAllUsers resolver called');
    
    // No authentication check
    // No pagination - returns all users
    
    // SQL injection risk - but no user input here
    const query = 'SELECT * FROM users';
    
    try {
      // Missing error handling
      const [rows] = await db.query(query);
      
      console.log('[DEBUG] Found', rows.length, 'users');
      
      // Over-fetching - returns all fields including passwords
      return rows;
    } catch (error) {
      // Missing error handling
      console.error('[ERROR] Failed to get users:', error);
      throw error;
    }
  },

  // No authentication check
  // No input validation
  // SQL injection risk
  // Over-fetching
  getUserByEmail: async (parent, args, context) => {
    console.log('[DEBUG] getUserByEmail resolver called with email:', args.email);
    
    // No authentication check
    // No input validation - email format not validated
    
    // SQL injection risk - email directly in query
    const query = `SELECT * FROM users WHERE email = '${args.email}'`;
    
    try {
      // Missing error handling
      const [rows] = await db.query(query);
      
      if (rows.length === 0) {
        console.log('[DEBUG] User not found with email:', args.email);
        return null;
      }
      
      const user = rows[0];
      console.log('[DEBUG] User found:', user.email);
      
      // Over-fetching - returns password
      return user;
    } catch (error) {
      // Missing error handling
      console.error('[ERROR] Failed to get user by email:', error);
      throw error;
    }
  },

  // No authentication check
  // No input validation
  // SQL injection risk
  // Over-fetching
  searchUsers: async (parent, args, context) => {
    console.log('[DEBUG] searchUsers resolver called with term:', args.searchTerm);
    
    // No authentication check
    // No input validation - searchTerm not sanitized
    
    // SQL injection risk - searchTerm directly in query
    const query = `SELECT * FROM users WHERE name LIKE '%${args.searchTerm}%' OR email LIKE '%${args.searchTerm}%'`;
    
    try {
      // Missing error handling
      const [rows] = await db.query(query);
      
      console.log('[DEBUG] Found', rows.length, 'matching users');
      
      // Over-fetching - returns all fields including passwords
      return rows;
    } catch (error) {
      // Missing error handling
      console.error('[ERROR] Failed to search users:', error);
      throw error;
    }
  },

  // No authentication check
  // No input validation
  // SQL injection risk
  // Missing error handling
  createUser: async (parent, args, context) => {
    console.log('[DEBUG] createUser resolver called');
    console.log('[DEBUG] User input:', args.input);
    
    // No authentication check
    // No input validation - email format, password strength, etc.
    
    const { email, name, phone, password, address, dateOfBirth } = args.input;
    
    // SQL injection risk - user input directly in query
    const query = `INSERT INTO users (email, name, phone, password, address, date_of_birth) VALUES ('${email}', '${name}', '${phone}', '${password}', '${address}', '${dateOfBirth}')`;
    
    try {
      // Missing error handling
      const [result] = await db.query(query);
      
      console.log('[DEBUG] User created with id:', result.insertId);
      
      // Fetch created user - SQL injection risk again
      const getUserQuery = `SELECT * FROM users WHERE id = ${result.insertId}`;
      const [rows] = await db.query(getUserQuery);
      
      // Over-fetching - returns password
      return rows[0];
    } catch (error) {
      // Missing error handling
      console.error('[ERROR] Failed to create user:', error);
      throw error;
    }
  },

  // No authentication check
  // No input validation
  // SQL injection risk
  // Missing error handling
  updateUser: async (parent, args, context) => {
    console.log('[DEBUG] updateUser resolver called for id:', args.id);
    console.log('[DEBUG] Update input:', args.input);
    
    // No authentication check
    // No authorization check - users can update any user
    // No input validation
    
    const { email, name, phone, password, address, dateOfBirth } = args.input;
    
    // SQL injection risk - user input directly in query
    let updateFields = [];
    if (email) updateFields.push(`email = '${email}'`);
    if (name) updateFields.push(`name = '${name}'`);
    if (phone) updateFields.push(`phone = '${phone}'`);
    if (password) updateFields.push(`password = '${password}'`); // Password stored in plain text
    if (address) updateFields.push(`address = '${address}'`);
    if (dateOfBirth) updateFields.push(`date_of_birth = '${dateOfBirth}'`);
    
    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ${args.id}`;
    
    try {
      // Missing error handling
      await db.query(query);
      
      console.log('[DEBUG] User updated:', args.id);
      
      // Fetch updated user - SQL injection risk
      const getUserQuery = `SELECT * FROM users WHERE id = ${args.id}`;
      const [rows] = await db.query(getUserQuery);
      
      // Over-fetching - returns password
      return rows[0];
    } catch (error) {
      // Missing error handling
      console.error('[ERROR] Failed to update user:', error);
      throw error;
    }
  },

  // No authentication check
  // No authorization check
  // SQL injection risk
  // Missing error handling
  deleteUser: async (parent, args, context) => {
    console.log('[DEBUG] deleteUser resolver called for id:', args.id);
    
    // No authentication check
    // No authorization check - users can delete any user
    // No input validation
    
    // SQL injection risk - id directly in query
    const query = `DELETE FROM users WHERE id = ${args.id}`;
    
    try {
      // Missing error handling
      await db.query(query);
      
      console.log('[DEBUG] User deleted:', args.id);
      return true;
    } catch (error) {
      // Missing error handling
      console.error('[ERROR] Failed to delete user:', error);
      throw error;
    }
  },
};

module.exports = userResolver;

