const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config");

const UserModel = require("../model/user.model");
const User = UserModel.User;

const activityService = require("./activity.service");
const userService = require("./user.service");

exports.verifyUserAndGenerateToken = async (username, password) => {
  const user = await userService.getUserByUsernameAndPass(username, password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  let token = jwt.sign({ username: user.username }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

  data = {
    username: username,
    summary: "logged in! Yee!",
  };
  // await activityService.createActivity(data);

  return token;
};

exports.verifyGoogleUserAndGenerateToken = async (email) => {
  const user = await userService.getUserByGoogleMail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  let token = jwt.sign({ username: user.username }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

  // data = {
  //   username: user.username,
  //   summary: "logged in! Yee!",
  // };
  // await activityService.createActivity(data);

  return token;
};

exports.getGoogleToken = async (email) => {
  const user = await userService.getUserByGoogleMail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user.google_token;
};
