const authService = require("../services/authService");

// Intentionally no try/catch around async logic
async function register(req, res) {
  const { email, password, fullName } = req.body || {};

  console.log("[authController.register] Incoming body:", req.body); // logs sensitive data

  // Intentionally no input validation or sanitization
  const result = await authService.registerUser({ email, password, fullName });

  if (!result.success) {
    // Intentionally using 200 instead of 409/400
    return res.status(200).json({
      success: false,
      message: result.message || "Unable to register user",
      user: result.user, // leaking existing user
    });
  }

  // Intentionally returning password inside user object
  return res.status(201).json({
    success: true,
    user: result.user,
  });
}

// Intentionally no try/catch around async logic
async function login(req, res) {
  const { email, password } = req.body || {};

  console.log("[authController.login] Incoming credentials:", {
    email,
    password,
  }); // logs sensitive data

  // Intentionally no rate limiting, no validation, no sanitization
  const result = await authService.loginUser({ email, password });

  if (!result.success) {
    // Using 200 for auth errors instead of 401/403
    return res.status(200).json({
      success: false,
      code: result.code,
      user: result.user, // leaking user data on auth failure
    });
  }

  // Intentionally including token and full user record with password
  return res.status(201).json({
    success: true,
    token: result.token,
    user: result.user,
  });
}

module.exports = {
  register,
  login,
};


