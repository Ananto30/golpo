import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Message,
  Transition,
} from "semantic-ui-react";

import client from "../client";

class SendMessageModal extends Component {
  state = { open: false, sent: false };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  sendMessageHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    client.Chat.sendMessage(this.props.user, data.get("text")).then((res) => {
      console.log(res);
      this.setState({
        sent: true,
      });

      this.close();
      setTimeout(() => {
        this.setState({
          sent: false,
        });
      }, 3000);
    });
  };

  render() {
    const { open, dimmer, sent } = this.state;

    return (
      <div>
        <Button size="mini" onClick={this.show("blurring")}>
          Send Message
        </Button>
        <Transition
          visible={sent}
          unmountOnHide
          animation="scale"
          duration={500}
        >
          <Message success visible={sent} content="Message sent" />
        </Transition>

        <Modal
          as={Form}
          onSubmit={(e) => this.sendMessageHandler(e)}
          size="mini"
          dimmer={dimmer}
          open={open}
          onClose={this.close}
        >
          <Modal.Header>Send Message</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form.TextArea name="text" placeholder="Say something nice!" />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon="send"
              labelPosition="right"
              content="Send it!"
              type="submit"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default SendMessageModal;
