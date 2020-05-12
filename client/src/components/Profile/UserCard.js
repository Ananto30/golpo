import React, { useState } from "react";
import { TAGLINE, WORK } from "../../defaults";

import { Card } from "semantic-ui-react";
import SendMessageModal from "./SendMessageModal";
import UpdateProfileImageModal from "./UpdateProfileImageModal";
import UpdateProfileModal from "./UpdateProfileModal";

const UserCard = ({ userInfo, ownerProfile }) => {
  const [uInfo, setUserInfo] = useState(userInfo);
  const handleInfoChange = (info) => {
    setUserInfo(info);
  };
  return (
    <Card fluid>
      <UpdateProfileImageModal userInfo={uInfo} ownerProfile={ownerProfile} />
      <Card.Content>
        <Card.Header style={{ fontFamily: "monospace" }}>
          {uInfo.username}
        </Card.Header>
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
          <SendMessageModal user={uInfo.username} />
        )}
      </Card.Content>
    </Card>
  );
};

export default UserCard;
