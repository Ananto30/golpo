import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Comment from "semantic-ui-react/dist/commonjs/views/Comment";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import React from "react";
import CalenderMoment from "./CalenderMoment";

const ChatHistory = ({ user, history }) => (
  <Comment.Group>
    <Header as="h3" dividing>
      Chat with {user}
    </Header>

    {history
      ? history.map((chat) => (
          <Comment>
            <Comment.Avatar src="/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a">{chat.from}</Comment.Author>
              <Comment.Metadata>
                <div>
                  <CalenderMoment time={chat.date} />{" "}
                </div>
              </Comment.Metadata>
              <Comment.Text>{chat.text}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))
      : null}

    <Form reply>
      <Form.TextArea />
      <Button content="Add Reply" labelPosition="left" icon="edit" primary />
    </Form>
  </Comment.Group>
);

export default ChatHistory;
