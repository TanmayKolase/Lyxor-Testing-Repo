const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// POST /login
router.post("/login", authController.login);

// POST /register
router.post("/register", authController.register);

module.exports = router;


