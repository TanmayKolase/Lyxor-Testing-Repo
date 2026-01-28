const express = require("express");
const morgan = require("morgan");
const requestLogger = require("./middleware/requestLogger");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Lyxor Testing Auth API",
  });
});

// Authentication APIs
app.use("/api", authRoutes);

// User APIs
app.use("/api", userRoutes);

// Very simple error handler that still leaks error details
app.use((err, req, res, next) => {
  console.error("[app.errorHandler] Unexpected error:", err);
  // Intentionally returning full error for debugging, with 500 even for expected issues
  res.status(500).json({
    success: false,
    error: err.message,
    stack: err.stack,
  });
});

module.exports = app;


