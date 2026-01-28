const userService = require("../services/userService");

// Intentionally no authentication/authorization checks
// Intentionally no try/catch around async logic
async function getUsers(req, res) {
  console.log("[userController.getUsers] Request from", req.ip);

  const users = await userService.getAllUsers();

  // Intentionally returning sensitive data including passwords
  return res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
}

module.exports = {
  getUsers,
};


