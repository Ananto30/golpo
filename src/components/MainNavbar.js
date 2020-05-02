import React from "react";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import {Link} from "react-router-dom";
import routes from "../routes";

class MainNavbar extends React.Component {
  state = {
    activeItem: "home"
  }
  handleMenuClick = (e, {name}) => {
    this.setState({activeItem: name})
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary
        // fixed="top"
            attached="top"
            style={{height: "100px", border: "none"}}
      >
        <Menu.Item name="home" active={activeItem === "home"} onClick={this.handleMenuClick}>
          <Link to={routes.home}>Home</Link>
        </Menu.Item>
        <Menu.Item name="message" active={activeItem === "message"} onClick={this.handleMenuClick}>
          <Link to={routes.message}>Messages</Link>
        </Menu.Item>
        <Menu.Item
          name='friends'
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...'/>
          </Menu.Item>
          <Menu.Item
            name='logout'
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default MainNavbar