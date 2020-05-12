import Feed from "semantic-ui-react/dist/commonjs/views/Feed";
import React from "react";
import SingleFeed from "./SingleFeed";

const FeedList = ({ activities }) => (
  <Feed style={{ fontSize: "12px", lineHeight: "1.2em" }}>
    {activities
      .slice()
      // .sort(function (a, b) {
      //   return new Date(b.date) - new Date(a.date);
      // })
      .map((activity, index) => (
        <SingleFeed activity={activity} key={index} />
      ))}
  </Feed>
);

export default FeedList;
