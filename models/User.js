// User model - not actually used in the codebase
// This file exists but the code uses raw SQL queries instead

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password; // Should never expose password
    this.createdAt = data.created_at;
  }

  // This method is defined but never called
  static async findByEmail(email) {
    // Should use prepared statements
    return null;
  }
}

module.exports = User;

