import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Comment from "semantic-ui-react/dist/commonjs/views/Comment";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import React from "react";

const PostComment = () => (

  <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar src='/images/avatar/small/matt.jpg'/>
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Form reply>
      <Form.TextArea/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
    </Form>
  </Comment.Group>
)

export default PostComment