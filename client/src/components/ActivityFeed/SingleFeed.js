import React from "react";
import Feed from "semantic-ui-react/dist/commonjs/views/Feed";
import { IMAGE_LARGE } from "../../defaults";
import Moment from "react-moment";

import { inject, observer } from "mobx-react";

import styles from "../../chat.module.css";

const SingleFeed = ({ activity, ...props }) => {
  const imageCache = props.commonStore.usersImageCache;
  return (
    <Feed.Event className={styles.itemslideup}>
      <Feed.Label
        image={
          imageCache && activity.username in imageCache
            ? `/images/avatar/large/${imageCache[activity.username]}`
            : IMAGE_LARGE
        }
      />
      <Feed.Content>
        <Feed.Date>
          <Moment date={activity.date} fromNow />
        </Feed.Date>
        <Feed.Summary>{`${activity.username} ${activity.summary}`}</Feed.Summary>
        <Feed.Extra text>{activity.extra_text}</Feed.Extra>
        <Feed.Extra
          images={
            activity.extra_images.length > 0 &&
            activity.extra_images[0] && [
              `/images/avatar/large/${activity.extra_images[0]}`,
            ]
          }
        />
      </Feed.Content>
    </Feed.Event>
  );
};

export default inject("commonStore")(observer(SingleFeed));
