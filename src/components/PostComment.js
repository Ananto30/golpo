import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Comment from "semantic-ui-react/dist/commonjs/views/Comment";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import React from "react";
import CalenderMoment from "./CalenderMoment";

const PostComment = ({ comments }) => (
  <Comment.Group>
    <Header as="h3" dividing>
      Comments
    </Header>

    {comments.map((comment) => (
      <Comment>
        <Comment.Avatar src="/images/avatar/small/matt.jpg" />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>
              <CalenderMoment time={comment.date} />
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.text}</Comment.Text>
          {/* <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions> */}
        </Comment.Content>
      </Comment>
    ))}

    <Form reply>
      <Form.TextArea />
      <Button content="Add Reply" labelPosition="left" icon="edit" primary />
    </Form>
  </Comment.Group>
);

export default PostComment;
