import React from "react";
import {Grid, Item} from "semantic-ui-react";
import ChatMenu from "../components/ChatMenu";
import ChatHistory from "../components/ChatHistory";

export default class Chat extends React.Component {
  state = {
    activeItem: null,
    chatHistory: [
    ]
  }

  handleSelect = (e, {name}) => {
    this.setState({activeItem: name})
    if (name === "mama") {
      this.setState({
        chatHistory: [
          {
            from: "ananto",
            time: "2020-04-30T12:59-0500",
            content: "haha"
          },
          {
            from: "ananto",
            time: "asdf",
            content: "haha"
          },
          {
            from: "ananto",
            time: "asdf",
            content: "haha"
          },
          {
            from: "ananto",
            time: "asdf",
            content: "haha"
          }
        ]
      })
    }
  }

  render() {
    return (

      <Grid>

        <Grid.Column width={4}>
          <ChatMenu activeItem={this.state.activeItem} handleSelect={this.handleSelect}/>
        </Grid.Column>
        <Grid.Column width={12}>

          <ChatHistory user={this.state.activeItem} history={this.state.chatHistory}/>
        </Grid.Column>
      </Grid>
    )
  }
}
