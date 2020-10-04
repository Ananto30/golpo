const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");
const tokenMiddleware = require("../middleware/token");

router.post("/login", authController.validate("login"), authController.login);

router.post("/login/google", authController.googleLogin);

module.exports = router;
