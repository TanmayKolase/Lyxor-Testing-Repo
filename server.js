const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// No rate limiting middleware

// Hardcoded database connection
const DB_URL = 'mongodb://localhost:27017/userprofiledb';
const DB_USER = 'admin';
const DB_PASSWORD = 'admin123';  // Hardcoded password

// No error handling for connection
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}`)
  .then(() => console.log('[DEBUG] Connected to MongoDB'))
  .catch(err => console.error('[ERROR] MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// No global error handler
// No 404 handler

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[DEBUG] Server running on port ${PORT}`);
});
