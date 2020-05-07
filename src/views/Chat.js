import React, { createContext } from "react";
import { Grid, Dimmer, Loader, Form, Button, Ref } from "semantic-ui-react";

import { inject, observer } from "mobx-react";

import ChatMenu from "../components/ChatMenu";
import ChatHistory from "../components/ChatHistory";
import client from "../client";
import styles from "../chat.module.css";

class Chat extends React.Component {
  contextRef = createContext();
  state = {
    activeItem: null,
    chats: [],
    chatHistory: [],
    menuLoading: true,
    historyLoading: false,
  };

  componentDidMount() {
    client.Chat.getChats().then((res) => {
      this.setState({
        chats: res.data.chats,
        menuLoading: false,
      });
    });
  }

  handleSelect = (e, { name }) => {
    this.setState({ activeItem: name, historyLoading: true });
    client.Chat.getChatsByReceiver(name).then((res) => {
      this.setState({
        chatHistory: res.data.chats,
        historyLoading: false,
      });
    });
  };

  handleChat = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    client.Chat.sendChat(this.state.activeItem, data.get("text")).then(
      (res) => {
        let chat = {
          from: this.props.commonStore.loggedUser.username,
          text: data.get("text"),
          date: new Date(),
        };
        this.setState((prev) => ({
          chatHistory: [...prev.chatHistory, chat],
        }));
        // TODO: this seems a bit shitty
        document.getElementById("chatText").reset();
      }
    );
  };


  render() {
    const {
      activeItem,
      chats,
      chatHistory,
      menuLoading,
      historyLoading,
    } = this.state;
    const loggedUser = this.props.commonStore.loggedUser;
    return (
      <Ref innerRef={this.contextRef}>
        <Grid>
          <Grid.Column width={4} className={styles.chatmenu}>
            {menuLoading ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            ) : chats.length === 0 ? (
              "Can't you talk?! Go to someone's profile and start talking :|"
            ) : (
              <ChatMenu
                activeItem={activeItem}
                handleSelect={this.handleSelect}
                chats={chats}
                loggedUser={loggedUser}
              />
            )}
          </Grid.Column>
          <Grid.Column width={10}>
            {historyLoading ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            ) : (
              activeItem && (
                <>
                  <ChatHistory
                    user={activeItem}
                    history={chatHistory}
                    handleChat={this.handleChat}
                    
                  />
                  <Form
                    id="chatText"
                    onSubmit={this.handleChat}
                    reply
                    style={{ paddingTop: "20px" }}
                  >
                    <Form.TextArea name="text" />
                    <Button
                      content="Add Reply"
                      labelPosition="left"
                      icon="edit"
                    />
                  </Form>
                </>
              )
            )}
          </Grid.Column>
        </Grid>
      </Ref>
    );
  }
}

export default inject("commonStore")(observer(Chat));
