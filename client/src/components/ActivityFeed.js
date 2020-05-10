import Feed from "semantic-ui-react/dist/commonjs/views/Feed";
import React from "react";

import { inject, observer } from "mobx-react";

import client from "../client";
import { IMAGE_LARGE } from "../defaults";
import Moment from "react-moment";
import ActivityPlaceholder from "./Loaders/ActivityPlaceholder";

class ActivityFeed extends React.Component {
  state = {
    activities: [],
    isLoading: true,
  };
  async componentDidMount() {
    try {
      let res = await client.Activity.getAll();
      this.setState({
        activities: res.data.activities,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { activities, isLoading } = this.state;
    const imageCache = this.props.commonStore.usersImageCache;
    return (
      <>
        {isLoading ? (
          <ActivityPlaceholder />
        ) : (
          <Feed>
            {activities
              .sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
              })
              .map((act, index) => (
                <Feed.Event key={index}>
                  <Feed.Label
                    image={
                      imageCache && act.username in imageCache
                        ? `/images/avatar/large/${imageCache[act.username]}`
                        : IMAGE_LARGE
                    }
                  />
                  <Feed.Content>
                    <Feed.Date>
                      <Moment date={act.date} fromNow />
                    </Feed.Date>
                    <Feed.Summary>{`${act.username} ${act.summary}`}</Feed.Summary>
                    <Feed.Extra text>{act.extra_text}</Feed.Extra>
                    <Feed.Extra
                      images={
                        act.extra_images[0] && [
                          `/images/avatar/large/${act.extra_images[0]}`,
                        ]
                      }
                    />
                  </Feed.Content>
                </Feed.Event>
              ))}
          </Feed>
        )}
      </>
    );
  }
}

export default inject("commonStore")(observer(ActivityFeed));