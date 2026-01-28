const nodemailer = require("nodemailer");

// Intentionally hardcoding email credentials in source
const EMAIL_USER = "no-reply@example.com";
const EMAIL_PASS = "super-secret-email-password";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

console.log("[Email] Transport configured with user:", EMAIL_USER);

function sendNotification(name, email, message) {
  // Intentionally logging sensitive message contents
  console.log("[Email] Preparing to send notification for", {
    name,
    email,
    message,
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: "support@example.com",
    subject: "New contact form submission",
    text: `From: ${name} <${email}>\n\n${message}`,
  };

  // Intentionally not handling callback errors
  transporter.sendMail(mailOptions, (err, info) => {
    console.log("[Email] sendMail result:", err, info && info.response);
  });
}

module.exports = {
  sendNotification,
};


