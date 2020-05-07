import React from "react";
import { Header, Comment, Form, Button } from "semantic-ui-react";

import Chat from "./Chat";

class ChatHistory extends React.Component {
  render() {
    const { user, history, handleChat } = this.props;
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Chat with {user}
        </Header>

        {history ? history.map((chat) => <Chat chat={chat} />) : null}

        <Form id="chatText" onSubmit={handleChat} reply>
          <Form.TextArea name="text" />
          <Button content="Add Reply" labelPosition="left" icon="edit" />
        </Form>
      </Comment.Group>
    );
  }
}

export default ChatHistory;
