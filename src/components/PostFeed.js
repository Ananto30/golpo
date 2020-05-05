import { Item } from "semantic-ui-react";
import React from "react";
import { Link } from "react-router-dom";
import CalenderMoment from "./CalenderMoment";

const PostFeed = ({ posts }) => (
  <Item.Group link divided>
    {posts
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map((post) => (
        <Item as={Link} to={`/post/${post._id}`}>
          <Item.Image size="tiny" src="/images/avatar/large/stevie.jpg" />

          <Item.Content>
            <Item.Header>{post.author}</Item.Header>
            <Item.Meta>
              <CalenderMoment time={post.date} />
            </Item.Meta>
            <Item.Description style={{ whiteSpace: "pre-line" }}>
              {post.text}
            </Item.Description>
            <Item.Extra>{post.comments} comments</Item.Extra>
          </Item.Content>
        </Item>
      ))}
  </Item.Group>
);

export default PostFeed;
