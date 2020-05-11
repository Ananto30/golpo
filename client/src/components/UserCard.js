import React, { useState } from "react";
import { Card } from "semantic-ui-react";

import SendMessageModal from "./SendMessageModal";
import UpdateProfileModal from "./UpdateProfileModal";
import UpdateProfileImageModal from "./UpdateProfileImageModal";
import { WORK, TAGLINE } from "../defaults";

const UserCard = ({ userInfo, ownerProfile }) => {
  const [uInfo, setUserInfo] = useState(userInfo);
  const handleInfoChange = (info) => {
    setUserInfo(info);
  };
  return (
    <Card fluid>
      <UpdateProfileImageModal userInfo={uInfo} ownerProfile={ownerProfile} />
      <Card.Content>
        <Card.Header>{uInfo.username}</Card.Header>
        <Card.Meta>
          <span className="date">{!uInfo.work ? WORK : uInfo.work}</span>
        </Card.Meta>
        <Card.Description>
          {!uInfo.tagline ? TAGLINE : uInfo.tagline}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {ownerProfile ? (
          <UpdateProfileModal
            userInfo={uInfo}
            handleInfoChange={handleInfoChange}
          />
        ) : (
          <SendMessageModal user={uInfo.username}/>
        )}
      </Card.Content>
    </Card>
  );
};

export default UserCard;
