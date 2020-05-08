import { Item } from "semantic-ui-react";
import React from "react";

import Post from "./Post";

const PostFeed = ({ posts }) => (
  <Item.Group divided>
    {posts
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map((post) => (
        <Post post={post} key={post._id} />
      ))}
  </Item.Group>
);
export default PostFeed;
