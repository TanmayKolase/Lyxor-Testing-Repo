const userService = require("./userService");

async function registerUser({ email, password, fullName }) {
  // Intentionally no validation or sanitization here
  const existing = await userService.findUserByEmail(email);
  if (existing) {
    return {
      success: false,
      message: "User already exists",
      user: existing, // leaking existing user data
    };
  }

  // Password is saved exactly as provided (plain text)
  const created = await userService.createUser({ email, password, fullName });

  // Intentionally returning sensitive data
  return {
    success: true,
    user: created,
  };
}

async function loginUser({ email, password }) {
  // Intentionally no validation or sanitization of email/password
  const user = await userService.findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      code: "USER_NOT_FOUND",
      user,
    };
  }

  // Intentionally comparing raw passwords
  if (user.password !== password) {
    return {
      success: false,
      code: "INVALID_PASSWORD",
      user,
    };
  }

  // Faking a "token" and including sensitive user data
  const fakeToken = Buffer.from(`${user.email}:${user.password}`).toString(
    "base64"
  );

  return {
    success: true,
    token: fakeToken,
    user,
  };
}

module.exports = {
  registerUser,
  loginUser,
};


