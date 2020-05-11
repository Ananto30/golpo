import { Item } from "semantic-ui-react";
import React from "react";

import Post from "./Post";

const PostFeed = ({ posts }) => (
  <Item.Group divided unstackable>
    {posts
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map((post, index) => (
        <Post post={post} key={index} />
      ))}
  </Item.Group>
);
export default PostFeed;
