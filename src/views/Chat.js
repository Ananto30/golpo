import React from "react";
import {Grid, Item} from "semantic-ui-react";
import ChatMenu from "../components/ChatMenu";
import ChatHistory from "../components/ChatHistory";

export default class Chat extends React.Component {
  state = {
    activeItem: "mama"
  }

  handleSelect = (e, {name}) => {
    this.setState({activeItem: name})
  }

  render() {
    return (

      <Grid>

        <Grid.Column width={4}>
          <ChatMenu activeItem={this.state.activeItem} handleSelect={this.handleSelect}/>
        </Grid.Column>
        <Grid.Column width={12}>

          <ChatHistory user={this.state.activeItem}/>
        </Grid.Column>
      </Grid>
    )
  }
}
