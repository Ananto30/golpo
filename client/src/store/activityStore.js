import { observable, action, decorate } from "mobx";
import client from "../client";

class ActivityStore {
  activities = [];
  isLoadingActivities = false;

  setActivites(activities) {
    this.activities = activities;
  }

  addActivity(activity) {
    this.activities.push(activity);
  }

  loadActivities() {
    this.isLoadingActivities = true;
    client.Activity.getAll()
      .then((res) => {
        this.setActivites(res.data.activities);
      })
      .finally(action(() => {this.isLoadingActivities = false}));
  }
}

decorate(ActivityStore, {
  activities: observable,
  isLoadingActivities: observable,

  setActivites: action,
  addActivity: action,
  loadActivities: action,
});

export default new ActivityStore();
