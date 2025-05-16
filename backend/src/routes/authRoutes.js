const express = require("express");
const AuthController = require("../controllers/AuthController");
const { authenticate } = require("../middlewares/authentication");
const validator = require("../middlewares/validator");
const {
  loginSchema,
  registerSchema,
} = require("../validations/userValidation");

const router = express.Router();

// Public routes
router.post("/register", validator(registerSchema), AuthController.register);
router.post("/login", validator(loginSchema), AuthController.login);

// Protected routes
router.get("/me", authenticate, AuthController.getMe);

module.exports = router;
