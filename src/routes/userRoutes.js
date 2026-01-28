const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// GET /users
// Intentionally no auth middleware, open to everyone
router.get("/users", userController.getUsers);

module.exports = router;


