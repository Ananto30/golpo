const express = require("express");
const router = express.Router();

const activityController = require("../controller/activity.controller");
const tokenMiddleware = require("../middleware/token");

router.get(
  "/",
  tokenMiddleware.checkToken,
  activityController.getAllActivities
);

router.get(
  "/me",
  tokenMiddleware.checkToken,
  activityController.getActivitiesByToken
);

module.exports = router;
