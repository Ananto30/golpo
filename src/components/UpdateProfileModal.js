import React, { Component } from "react";
import { Button, Header, Image, Modal, Form } from "semantic-ui-react";

class UpdateProfileModal extends Component {
  state = { open: false };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  sendMessageHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    this.close();
    console.log(data.get("work"));
  };

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button size="mini" onClick={this.show("blurring")}>
          Edit Profile
        </Button>

        <Modal
          as={Form}
          onSubmit={(e) => this.sendMessageHandler(e)}
          size="tiny"
          dimmer={dimmer}
          open={open}
          onClose={this.close}
        >
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form.Field>
                <label>Occupation/Work/Study</label>
                <input name="work" placeholder="What do you do? Most of the time....." />
              </Form.Field>
              <Form.Field>
                <label>Tagline</label>
                <input name="tagline" placeholder="You don't have a tagline?! Phew!" />
              </Form.Field>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon="check"
              labelPosition="right"
              content="Save"
              type="submit"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default UpdateProfileModal;
