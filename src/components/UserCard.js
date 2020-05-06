import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";

import SendMessageModal from "./SendMessageModal";
import UpdateProfileModal from "./UpdateProfileModal";
import UpdateProfileImageModal from "./UpdateProfileImageModal";

const UserCard = ({ userInfo, ownerProfile }) => (
  <Card image="/images/avatar/large/elliot.jpg">
    {/* <Image
      as={Button}
      src="/images/avatar/large/matthew.png"
      wrapped
      ui={false}
    /> */}
    <UpdateProfileImageModal />
    <Card.Content>
      <Card.Header>{userInfo.username}</Card.Header>
      <Card.Meta>
        <span className="date">
          {!userInfo.work ? "Workless" : userInfo.work}
        </span>
      </Card.Meta>
      <Card.Description>
        {!userInfo.tagline ? "This one has no tagline!!" : userInfo.tagline}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {ownerProfile ? <UpdateProfileModal /> : <SendMessageModal />}
    </Card.Content>
  </Card>
);

export default UserCard;
