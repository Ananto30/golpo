import React from "react";
import { Menu, Image, List } from "semantic-ui-react";

const ChatMenu = ({ activeItem, handleSelect, chats, loggedUser }) => {
  return (
    <List selection verticalAlign="middle">
      {chats.map((chat) => {
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
              src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
            />
            <List.Content>
              <List.Header>{oppositeUser}</List.Header>
              <List.Description>
                {chat.chats[0].from} : {chat.chats[0].text}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};
export default ChatMenu;
