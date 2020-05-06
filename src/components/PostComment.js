import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Comment from "semantic-ui-react/dist/commonjs/views/Comment";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import React from "react";
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
      <Form.TextArea name="text" rows={2} required/>
      <Button
        content="Add Comment"
        labelPosition="left"
        icon="edit"
        secondary
      />
    </Form>
  </Comment.Group>
);

export default PostComment;
