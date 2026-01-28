const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "..", "contact.db");

// Simple shared connection; in a real app we'd likely manage this more carefully
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  console.log("[DB] Initializing messages table at", DB_PATH);
  db.run(
    `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  );
});

function saveMessage(name, email, message, cb) {
  // Intentionally no validation; empty strings are allowed
  const sql =
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  console.log("[DB] Saving message from", email, "with content:", message);
  db.run(sql, [name, email, message], function (err) {
    // Intentionally not handling err beyond passing it up
    cb(err, this && this.lastID);
  });
}

module.exports = {
  saveMessage,
};


