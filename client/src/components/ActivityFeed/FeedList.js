import React from "react";
import Feed from "semantic-ui-react/dist/commonjs/views/Feed";
import SingleFeed from "./SingleFeed";

const FeedList = ({ activities }) => (
  <Feed>
    {activities
      .slice()
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map((activity, index) => (
        <SingleFeed activity={activity} key={index} />
      ))}
  </Feed>
);

export default FeedList;
