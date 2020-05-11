import React, { Component } from "react";
import { Button, Image, Modal, Popup } from "semantic-ui-react";
import { inject, observer } from "mobx-react";

import client from "../../client";
import { IMAGE_LARGE } from "../../defaults";

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
      this.props.commonStore.addUserImageCache(res.data);
    });
    this.close();
  };

  render() {
    const { open, dimmer, userInfo } = this.state;
    const image = (
      <Image
        src={
          userInfo && userInfo.image
            ? `/images/avatar/large/${userInfo.image}`
            : IMAGE_LARGE
        }
        wrapped
        ui={true}
      />
    );
    return (
      <div>
        {this.props.ownerProfile ? (
          <Popup trigger={image} flowing hoverable position="bottom center">
            <Button size="mini" onClick={this.show("blurring")}>
              Change Image
            </Button>
          </Popup>
        ) : (
          image
        )}

        <Modal size="tiny" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Choose the image that reflects you!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {this.listOfNames.map((name, index) => (
                <Image
                  as={Button}
                  src={`/images/avatar/small/${name}`}
                  wrapped
                  ui={false}
                  size="tiny"
                  onClick={() => this.sendMessageHandler(name)}
                  key={index}
                />
              ))}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default inject("commonStore")(observer(UpdateProfileImageModal));
