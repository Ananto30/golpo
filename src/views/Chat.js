import React from "react";
import { Grid, Item, Dimmer, Loader } from "semantic-ui-react";

import { inject, observer } from "mobx-react";

import ChatMenu from "../components/ChatMenu";
import ChatHistory from "../components/ChatHistory";
import client from "../client";

class Chat extends React.Component {
  state = {
    activeItem: null,
    chats: [],
    chatHistory: [],
  };
  componentDidMount() {
    client.Chat.getChats().then((res) => {
      this.setState({
        chats: res.data.chats,
      });
    });
  }
  handleSelect = (e, { name }) => {
    this.setState({ activeItem: name });
    client.Chat.getChatsByReceiver(name).then((res) => {
      this.setState({
        chatHistory: res.data.chats,
      });
    });
  };

  render() {
    const { activeItem, chats, chatHistory } = this.state;
    const loggedUser = this.props.commonStore.loggedUser;
    return (
      <Grid>
        <Grid.Column width={4}>
          {chats.length === 0 ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <ChatMenu
              activeItem={activeItem}
              handleSelect={this.handleSelect}
              chats={chats}
              loggedUser={loggedUser}
            />
          )}
        </Grid.Column>
        <Grid.Column width={12}>
          {!activeItem ? (
            "Select a user from left"
          ) : (
            
            <ChatHistory user={activeItem} history={chatHistory} />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default inject("commonStore")(observer(Chat));
