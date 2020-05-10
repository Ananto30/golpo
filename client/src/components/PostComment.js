import React from "react";
import { Header, Comment, Form, Button } from "semantic-ui-react";

import SComment from "./SComment";

const PostComment = ({ comments, handleComment }) => (
  <Comment.Group>
    <Header as="h3" dividing>
      Comments
    </Header>

    {comments
      // .sort(function (a, b) {
      //   return new Date(b.date) - new Date(a.date);
      // })
      .map((comment) => (
        <SComment comment={comment} />
      ))}

    <Form id="commentText" onSubmit={handleComment} reply>
      <Form.TextArea name="text" rows={2} required />
      <Button
        content="Add Comment"
        labelPosition="left"
        icon="edit"
      />
    </Form>
  </Comment.Group>
);

export default PostComment;
