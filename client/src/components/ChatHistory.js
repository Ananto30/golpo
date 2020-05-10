import React from "react";
import { Header, Comment } from "semantic-ui-react";

import styles from "../chat.module.css";

import Chat from "./Chat";

class ChatHistory extends React.Component {
  scrollToBottom = () => {
    // if (this.messagesEnd)
    //   this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    this.endElem.scrollIntoView({ behavior: "smooth" });
  };
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { user, history } = this.props;
    return (
      <>
        <Header as="h3" dividing>
          Chat with {user}
        </Header>
        <div
          className={styles.chathistory}
          // ref={(el) => {
          //   this.messagesEnd = el;
          // }}
        >
          <Comment.Group>
            {history ? history.map((chat) => <Chat chat={chat} />) : null}
            <div
              ref={(el) => {
                this.endElem = el;
              }}
            ></div>
          </Comment.Group>
        </div>
      </>
    );
  }
}

export default ChatHistory;
