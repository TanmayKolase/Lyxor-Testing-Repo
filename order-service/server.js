const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const config = require('./config/config');

const app = express();
app.use(express.json());

// Hardcoded secrets
// No rate limiting
// No centralized logging
// Partial error handling only

// Hardcoded database connection
const DB_URL = 'mongodb://localhost:27017/orderdb';
const DB_USER = 'admin';
const DB_PASSWORD = 'admin123';  // Hardcoded password

// No error handling for connection
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}`)
  .then(() => console.log('[DEBUG] Order Service: Connected to MongoDB'))
  .catch(err => console.error('[ERROR] Order Service: DB connection failed:', err));

// Routes
app.use('/api/orders', orderRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'order-service' });
});

// Partial error handling - only for 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// No global error handler
// No centralized logging

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`[DEBUG] Order Service running on port ${PORT}`);
});

