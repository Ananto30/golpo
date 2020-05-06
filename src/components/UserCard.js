import React, { useState } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";

import SendMessageModal from "./SendMessageModal";
import UpdateProfileModal from "./UpdateProfileModal";
import UpdateProfileImageModal from "./UpdateProfileImageModal";

const UserCard = ({ userInfo, ownerProfile }) => {
  const [uInfo, setUserInfo] = useState(userInfo);
  const handleInfoChange = (info) => {
    setUserInfo(info);
  };
  return (
    <Card>
      <UpdateProfileImageModal userInfo={uInfo} ownerProfile={ownerProfile}/>
      <Card.Content>
        <Card.Header>{uInfo.username}</Card.Header>
        <Card.Meta>
          <span className="date">{!uInfo.work ? "Workless" : uInfo.work}</span>
        </Card.Meta>
        <Card.Description>
          {!uInfo.tagline ? "This one has no tagline!!" : uInfo.tagline}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {ownerProfile ? (
          <UpdateProfileModal
            userInfo={uInfo}
            handleInfoChange={handleInfoChange}
          />
        ) : (
          <SendMessageModal />
        )}
      </Card.Content>
    </Card>
  );
};

export default UserCard;
