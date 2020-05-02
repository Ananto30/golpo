import React, {Component} from "react";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";

const ChatMenu = ({activeItem, handleSelect}) => {
  return (
    <Menu secondary vertical>
      <Menu.Item
        name='mama'
        active={activeItem === 'mama'}
        onClick={handleSelect}
      />
      <Menu.Item
        name='mami'
        active={activeItem === 'mami'}
        onClick={handleSelect}
      />
    </Menu>
  )
}
export default ChatMenu