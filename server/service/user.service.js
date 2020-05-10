const UserModel = require("../model/user.model");
const User = UserModel.User;
const UserInfo = UserModel.UserInfo;

const activityService = require("./activity.service");

exports.getUserByUsernameAndPass = async (username, password) => {
  const user = await User.findOne({
    username: username,
    password: password,
  });

  return user;
};

exports.getUserByGoogleMail = async (email) => {
  const user = await User.findOne({
    google_email: email,
  });

  return user;
};

exports.createUser = async (data) => {
  const user = await User.create(data);

  return user;
};

exports.updateUser = async (username, updateInfo) => {
  updates = {};
  if (updateInfo.google_token)
    updates["google_token"] = updateInfo.google_token;

  userInfo = await User.findOneAndUpdate({ username: username }, updates, {
    new: true,
  });

  return userInfo;
};

exports.getAllUsers = async () => {
  users = await UserInfo.find({});

  return users;
};

exports.getUserMeta = async (username) => {
  userInfo = await UserInfo.findOne({ username: username });

  return userInfo;
};

exports.createUserMeta = async (data) => {
  const user = await UserInfo.create(data);

  return user;
};

exports.updateUserMeta = async (username, updateInfo) => {
  updates = {};
  if (updateInfo.work) updates["work"] = updateInfo.work;
  if (updateInfo.tagline) updates["tagline"] = updateInfo.tagline;
  if (updateInfo.image) updates["image"] = updateInfo.image;

  userInfo = await UserInfo.findOneAndUpdate({ username: username }, updates, {
    new: true,
  });

  await metaUpdateActivity(username, updateInfo);

  return userInfo;
};

exports.getUsersMeta = async (usernames) => {
  usersMeta = await UserInfo.find({
    username: { $in: usernames },
  });

  return usersMeta;
};

metaUpdateActivity = async (username, updateInfo) => {
  if (updateInfo.image) {
    data = {
      username: username,
      summary: "changed their picture! WOW!",
      extraImages: [updateInfo.image],
    };
    await activityService.createActivity(data);
  }
  if (updateInfo.tagline) {
    data = {
      username: username,
      summary: "changed their tagline",
      extraText: updateInfo.tagline,
    };
    await activityService.createActivity(data);
  }
  if (updateInfo.work) {
    data = {
      username: username,
      summary: "changed their work status! Impressive!",
      extraText: updateInfo.work,
    };
    await activityService.createActivity(data);
  }
};
