const { body, validationResult } = require("express-validator");

const authService = require("../service/auth.service");
const googleAuthService = require("../service/google.auth.service");

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { username, password } = req.body;

    const token = await authService.verifyUserAndGenerateToken(
      username,
      password
    );

    res.status(200).json({ access_token: token });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { data } = req.body;

    const token = await authService.findOrCreateGoogleUserAndGenerateToken(
      data
    );

    res.status(200).json({ access_token: token });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getGoogleAuthUrl = async (req, res) => {
  try {
    const url = await googleAuthService.getGoogleAuthUrl();

    res.status(200).json({ auth_url: url });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getTokenByGoogleCode = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { code } = req.body;

    const token = await googleAuthService.getTokenByGoogleCode(code);
    console.log(token);

    res.status(200).json({ access_token: token });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [
        body("username", "username is required").exists(),
        body("password", "password is required").exists(),
      ];
    }
    case "getTokenByGoogleCode": {
      return [body("code", "code is required").exists()];
    }
  }
};
