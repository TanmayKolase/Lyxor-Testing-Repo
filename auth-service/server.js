const express = require('express');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();
app.use(express.json());

// Hardcoded secrets
// No rate limiting
// No centralized logging
// Partial error handling only

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

// Partial error handling - only for 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// No global error handler
// No centralized logging

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`[DEBUG] Auth Service running on port ${PORT}`);
});

