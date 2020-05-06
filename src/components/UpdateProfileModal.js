import React, { Component } from "react";
import { Button, Header, Image, Modal, Form } from "semantic-ui-react";

import client from "../client";

class UpdateProfileModal extends Component {
  state = { open: false, userInfo: this.props.userInfo };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  sendMessageHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const meta = {};
    if (data.get("work")) meta["work"] = data.get("work");
    if (data.get("tagline")) meta["tagline"] = data.get("tagline");
    client.User.updateMeta(meta).then((res) => {
      this.setState({
        userInfo: res.data,
      });
      this.props.handleInfoChange(res.data);
    });
    this.close();
  };

  render() {
    const { open, dimmer, userInfo } = this.state;

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
                <input
                  name="work"
                  placeholder="What do you do? Most of the time....."
                  defaultValue={
                    userInfo && userInfo.work ? userInfo.work : null
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Tagline</label>
                <input
                  name="tagline"
                  placeholder="You don't have a tagline?! Phew!"
                  defaultValue={
                    userInfo && userInfo.tagline ? userInfo.tagline : null
                  }
                />
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
