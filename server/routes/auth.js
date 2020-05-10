const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");
const tokenMiddleware = require("../middleware/token");

router.post("/login", authController.validate("login"), authController.login);

router.get(
  "/login/googletoken/:email",
  authController.validate("googleLogin"),
  authController.getGoogleToken
);

router.post(
  "/login/google/success",
  tokenMiddleware.checkToken,
  authController.validate("googleLogin"),
  authController.googleLogin
);

module.exports = router;
