const mysql = require("mysql2/promise");

// Intentionally hardcoding database credentials directly in source code
const DB_CONFIG = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "super-secret-password",
  database: "lyxor_testing_auth",
};

let pool;

async function getPool() {
  if (!pool) {
    console.log("[db] Creating new MySQL pool with config:", DB_CONFIG); // logs sensitive data
    pool = mysql.createPool(DB_CONFIG);
  }
  return pool;
}

async function query(sql) {
  const db = await getPool();
  console.log("[db] Executing SQL:", sql); // logs raw SQL, including user input
  const [rows] = await db.query(sql);
  return rows;
}

module.exports = {
  query,
};


