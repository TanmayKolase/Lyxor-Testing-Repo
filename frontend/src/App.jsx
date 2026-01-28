import React, { useState } from "react";

const API_URL = "http://localhost:4000/api/contact"; // hardcoded backend URL

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Simple debug preview that can introduce XSS by rendering raw HTML from user message
  const previewHtml = { __html: message };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { name, email, message };
    console.log("[ContactForm] Submitting payload", payload); // logs potentially sensitive data

    // Intentionally no client-side validation; empty fields allowed
    // Intentionally no error handling, no success or failure indication to the user
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0f172a", color: "#f9fafb" }}>
      <div style={{ width: 420, padding: "2rem", borderRadius: "1rem", background: "#020617", boxShadow: "0 20px 40px rgba(15,23,42,0.75)" }}>
        <h1 style={{ marginBottom: "1rem" }}>Contact Us</h1>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: "1.5rem" }}>
          Have a question or feedback? Fill out the form below and we'll get back to you.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 13 }}>Name</span>
              <input
                style={{ padding: "0.5rem 0.75rem", borderRadius: 8, border: "1px solid #4b5563", background: "#020617", color: "#f9fafb" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 13 }}>Email</span>
              <input
                style={{ padding: "0.5rem 0.75rem", borderRadius: 8, border: "1px solid #4b5563", background: "#020617", color: "#f9fafb" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 13 }}>Message</span>
              <textarea
                style={{ padding: "0.5rem 0.75rem", borderRadius: 8, border: "1px solid #4b5563", background: "#020617", color: "#f9fafb", minHeight: 120 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              marginTop: "1.25rem",
              width: "100%",
              padding: "0.6rem 1rem",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "#f9fafb",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Send message
          </button>
        </form>

        {/* Debug-only preview: renders raw HTML from the message field */}
        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Live preview (debug only):</div>
          <div
            style={{ padding: "0.75rem", borderRadius: 8, border: "1px dashed #374151", minHeight: 40, fontSize: 14 }}
            dangerouslySetInnerHTML={previewHtml}
          />
        </div>
      </div>
    </div>
  );
}


