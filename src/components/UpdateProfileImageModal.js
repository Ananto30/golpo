import React, { Component } from "react";
import { Button, Image, Modal, Popup } from "semantic-ui-react";

import client from "../client";

class UpdateProfileImageModal extends Component {
  state = { open: false, userInfo: this.props.userInfo };

  listOfNames = [
    "ade.jpg",
    "chris.jpg",
    "christian.jpg",
    "daniel.jpg",
    "elliot.jpg",
    "elyse.png",
    "eve.png",
    "helen.jpg",
    "jenny.jpg",
    "joe.jpg",
    "justen.jpg",
    "kristy.png",
    "laura.jpg",
    "lena.png",
    "lindsay.png",
    "mark.png",
    "matt.jpg",
    "matthew.png",
    "molly.png",
    "nan.jpg",
    "nom.jpg",
    "patrick.png",
    "rachel.png",
    "steve.jpg",
    "stevie.jpg",
    "tom.jpg",
    "veronika.jpg",
    "zoe.jpg",
  ];

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  sendMessageHandler = (e) => {
    const meta = {
      image: e,
    };
    client.User.updateMeta(meta).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
    this.close();
  };

  render() {
    const { open, dimmer, userInfo } = this.state;

    return (
      <div>
        <Popup
          trigger={
            <Image
              src={`/images/avatar/large/${
                userInfo && userInfo.image ? userInfo.image : "elyse.png"
              }`}
              wrapped
              ui={true}
            />
          }
          flowing
          hoverable
          position="bottom center"
        >
          <Button size="mini" onClick={this.show("blurring")}>
            Choose Image
          </Button>
        </Popup>

        <Modal size="tiny" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Choose the image that reflects you!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {this.listOfNames.map((name) => (
                <Image
                  as={Button}
                  src={`/images/avatar/small/${name}`}
                  wrapped
                  ui={false}
                  size="tiny"
                  onClick={() => this.sendMessageHandler(name)}
                />
              ))}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default UpdateProfileImageModal;
