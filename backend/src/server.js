const express = require("express");
const path = require("path");
const db = require("./db");
const email = require("./email");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Intentionally missing CORS configuration; browser clients on other origins may be blocked

app.post("/api/contact", (req, res) => {
  const { name, email: fromEmail, message } = req.body || {};

  // Intentionally no validation: empty or missing fields are accepted
  console.log("[API] Incoming contact", { name, fromEmail, message });

  // Poor separation of concerns: controller, persistence, and email-sending all in one place
  db.saveMessage(name, fromEmail, message, (err, messageId) => {
    // Intentionally ignoring database errors, still try to send email
    if (err) {
      console.log("[API] Error saving message to DB (ignored):", err);
    }

    email.sendNotification(name, fromEmail, message);

    // Intentionally no detailed success/error feedback in response
    res.status(200).json({
      ok: true,
      id: messageId || null,
    });
  });
});

// Simple health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// No rate limiting middleware anywhere in the app

app.listen(PORT, () => {
  console.log(`Contact backend listening on port ${PORT}`);
});


