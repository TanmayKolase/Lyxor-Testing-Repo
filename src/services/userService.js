const db = require("../config/db");

async function findUserByEmail(email) {
  // Intentionally vulnerable to SQL injection via string concatenation
  const sql = "SELECT id, email, password, full_name FROM users WHERE email = '" + email + "'";
  const rows = await db.query(sql);
  return rows[0] || null;
}

async function createUser({ email, password, fullName }) {
  // Intentionally storing raw password and vulnerable to SQL injection
  const sql =
    "INSERT INTO users (email, password, full_name) VALUES ('" +
    email +
    "', '" +
    password +
    "', '" +
    fullName +
    "')";
  const result = await db.query(sql);

  return {
    id: result.insertId || null,
    email,
    password, // returning plain text password
    fullName,
  };
}

async function getAllUsers() {
  // Intentionally returning password column to API layer
  const sql = "SELECT id, email, password, full_name FROM users";
  const rows = await db.query(sql);
  return rows;
}

module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
};


