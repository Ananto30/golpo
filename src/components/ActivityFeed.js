import Feed from "semantic-ui-react/dist/commonjs/views/Feed";
import React from "react";
import moment from "moment";

import { inject, observer } from "mobx-react";

import client from "../client";
import { IMAGE_LARGE } from "../defaults";

class ActivityFeed extends React.Component {
  state = {
    activities: [],
  };
  componentDidMount() {
    const imageCache = this.props.commonStore.usersImageCache;
    client.Activity.getAll().then((res) => {
      const activities = res.data.activities;
      let events = activities.map((act) => {
        return {
          date: moment(act.date).fromNow(),
          summary: `${act.username} ${act.summary}`,
          extraText: act.extra_text,
          image:
            imageCache && act.username in imageCache
              ? `/images/avatar/large/${imageCache[act.username]}`
              : IMAGE_LARGE,
          extraImages: act.extra_images[0] && [
            `/images/avatar/large/${act.extra_images[0]}`,
          ],
        };
      });
      this.setState({
        activities: events,
      });
    });
  }
  render() {
    return <Feed events={this.state.activities} />;
  }
}

export default inject("commonStore")(observer(ActivityFeed));
