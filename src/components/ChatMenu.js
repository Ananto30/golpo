import React from "react";
import { Image, List } from "semantic-ui-react";
import Moment from "react-moment";

import { inject, observer } from "mobx-react";

import { IMAGE_LARGE } from "../defaults";

class ChatMenu extends React.Component {
  render() {
    const { activeItem, handleSelect, chats, loggedUser } = this.props;
    const imageCache = this.props.commonStore.usersImageCache;
    return (
      <List selection verticalAlign="middle">
        {chats
          .sort(function (a, b) {
            return new Date(b.chats[0].date) - new Date(a.chats[0].date);
          })
          .map((chat) => {
            const oppositeUser =
              chat.participants.filter((e) => e !== loggedUser.username)[0] ||
              chat.participants[0];
            return (
              <List.Item
                name={oppositeUser}
                active={activeItem === oppositeUser}
                onClick={handleSelect}
              >
                <Image
                  avatar
                  src={
                    imageCache && oppositeUser in imageCache
                      ? `/images/avatar/large/${imageCache[oppositeUser]}`
                      : IMAGE_LARGE
                  }
                />
                <List.Content>
                  <List.Header>{oppositeUser}</List.Header>
                  <List.Description>
                    {chat.chats[0].text.substring(0, 10)}
                    {" @ "}
                    <Moment date={chat.chats[0].date} fromNow />
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
      </List>
    );
  }
}
export default inject("commonStore")(observer(ChatMenu));
