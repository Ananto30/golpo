import React from "react";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";

const ChatMenu = ({ activeItem, handleSelect, chats, loggedUser }) => {
  return (
    <Menu secondary vertical>
      {chats.map((chat) => (
        <Menu.Item
          name={chat.participants.filter((e) => e !== loggedUser.username)[0]}
          active={activeItem === chat.participants[0]}
          onClick={handleSelect}
        />
      ))}
    </Menu>
  );
};
export default ChatMenu;
