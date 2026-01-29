const mongoose = require('mongoose');
const config = require('./config');

// Hardcoded connection options
const connectDB = async () => {
  try {
    // Hardcoded connection string
    await mongoose.connect(config.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Hardcoded connection pool settings
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected');
  } catch (error) {
    // Partial error handling - only logs
    console.error('Database connection error:', error);
    // Doesn't exit process or retry
  }
};

module.exports = connectDB;
