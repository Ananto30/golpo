const { body, validationResult } = require("express-validator");

const authService = require("../service/auth.service");

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { username, password } = req.body;

    token = await authService.verifyUserAndGenerateToken(username, password);

    res.status(200).json({ access_token: token });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { email } = req.body;

    token = await authService.verifyGoogleUserAndGenerateToken(email);

    res.status(200).json({ access_token: token });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getGoogleToken = async (req, res) => {
  try {
    // TODO: should use id here, non guessable
    const { email } = req.params;

    token = await authService.getGoogleToken(email);

    res.status(200).json({ access_token: token });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.googleLoginDirect = async (req, res) => {
  try {
    const { data } = req.body;

    token = await authService.findOrCreateGoogleUserAndGenerateToken(data);

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
    case "googleLogin": {
      return [body("email", "email is required").exists()];
    }
  }
};
