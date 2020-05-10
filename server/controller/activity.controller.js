const activityService = require("../service/activity.service");

exports.getAllActivities = async (req, res) => {
  try {
    activities = await activityService.getAll();

    res.status(200).json({ activities: activities });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};

exports.getActivitiesByToken = async (req, res) => {
  try {
    const { username } = req.decoded;

    activities = await activityService.getByUsername(username);

    res.status(200).json({ activities: activities });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    return;
  }
};
