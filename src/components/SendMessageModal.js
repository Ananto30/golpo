import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

class SendMessageModal extends Component {
  state = { open: false };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  sendMessageHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    this.close();
    console.log(data);
  };

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button size="mini" onClick={this.show("blurring")}>
          Send Message
        </Button>

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
