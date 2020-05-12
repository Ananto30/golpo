import React from "react";
import {Button, Form, Grid} from "semantic-ui-react";

import {inject, observer} from "mobx-react";

import ChatMenu from "../components/Message/ChatMenu";
import ChatHistory from "../components/Message/ChatHistory";
import client from "../client";
import styles from "../chat.module.css";
import Loading from "../components/Loaders/Loading";
import ActivityPlaceholder from "../components/Loaders/ActivityPlaceholder";
import ItemPlaceholder from "../components/Loaders/ItemPlaceholder";

import socket from "../socketClient";

class Message extends React.Component {
  state = {
    activeItem: null,
    chats: [],
    chatHistory: [],
    menuLoading: true,
    historyLoading: false,
  };

  async componentDidMount() {
    try {
      socket.socketIns().socket.on("message", (data) => {
        // console.log(data);
        if (data.from === this.state.activeItem)
          this.setState((prev) => ({
            chatHistory: [...prev.chatHistory, data],
          }));
      });

      let res = await client.Chat.getChats();
      this.setState({
        chats: res.data.chats,
        menuLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleSelect = (e, {name}) => {
    this.setState({activeItem: name, historyLoading: true});
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
    const text = data.get("text");
    if (text !== "") {
      let chat = {
        from: this.props.commonStore.loggedUser.username,
        text: text,
        date: new Date(),
        receiver: this.state.activeItem,
      };
      socket.socketIns().socket.emit("message", chat);

      this.setState((prev) => ({
        chatHistory: [...prev.chatHistory, chat],
      }));

      // TODO: this seems a bit shitty
      document.getElementById("chatText").reset();
    }
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
      <Grid stackable>
        <Grid.Column width={4} className={styles.chatmenu}>
          <Loading loading={menuLoading} component={ActivityPlaceholder}>
            {chats.length === 0 ? (
              "Can't you talk?! Go to someone's profile and start talking :|"
            ) : (
              <ChatMenu
                activeItem={activeItem}
                handleSelect={this.handleSelect}
                chats={chats}
                loggedUser={loggedUser}
              />
            )}
          </Loading>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loading loading={historyLoading} component={ItemPlaceholder}>
            {activeItem && (
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
                  style={{paddingTop: "20px"}}
                >
                  <Form.TextArea name="text"/>
                  <Button
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                  />
                </Form>
              </>
            )}
          </Loading>
        </Grid.Column>
      </Grid>
    );
  }
}

export default inject("commonStore")(observer(Message));
