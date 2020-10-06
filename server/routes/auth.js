const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");

router.post("/login", authController.validate("login"), authController.login);

router.post("/login/google", authController.googleLogin);

router.get("/login/google/getAuthUrl", authController.getGoogleAuthUrl);

router.post(
  "/login/google/getToken",
  authController.validate("getTokenByGoogleCode"),
  authController.getTokenByGoogleCode
);

module.exports = router;
