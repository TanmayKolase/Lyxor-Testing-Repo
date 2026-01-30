const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');

const app = express();
app.use(express.json());

// Hardcoded secrets
// No rate limiting
// No centralized logging
// Partial error handling only

// Hardcoded database connection
const DB_URL = 'mongodb://localhost:27017/userdb';
const DB_USER = 'admin';
const DB_PASSWORD = 'admin123';  // Hardcoded password

// No error handling for connection
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}`)
  .then(() => console.log('[DEBUG] User Service: Connected to MongoDB'))
  .catch(err => console.error('[ERROR] User Service: DB connection failed:', err));

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

// Partial error handling - only for 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// No global error handler
// No centralized logging

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[DEBUG] User Service running on port ${PORT}`);
});

