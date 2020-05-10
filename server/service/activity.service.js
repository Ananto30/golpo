const ActivityModel = require("../model/activity.model");
const Activity = ActivityModel.Activity;

exports.getAll = async () => {
  const activities = await Activity.find({});

  return activities;
};

exports.getByUsername = async (username) => {
  const activities = await Activity.find({ username: username });

  return activities;
};

exports.createActivity = async (data) => {
  const actData = {
    username: data.username,
    summary: data.summary,
    link: data.link,
    date: new Date(),
    extra_text: data.extraText,
    extra_images: data.extraImages,
  };
  const activity = await Activity.create(actData);
  sendSocketActivity(activity);
  return activity;
};

sendSocketActivity = (data) => {
  const io = require("../controller/socket.controller").connection();
  io.sendToAll("activity", JSON.stringify(data));
};
