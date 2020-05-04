import React from "react";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import { withRouter } from "react-router-dom";
import routes from "../routes";
import { Sticky } from "semantic-ui-react";

class MainNavbar extends React.Component {
  state = {
    activeItem: this.props.location.pathname.substring(1),
  };

  handleMenuClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push("/" + name);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Sticky>
        <Menu
          secondary
          // fixed="top"
          // attached="top"
          style={{ height: "100px", border: "none", backgroundColor: "#fff" }}
        >
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleMenuClick}
          />
          <Menu.Item
            name="message"
            active={activeItem === "message"}
            onClick={this.handleMenuClick}
          />
          <Menu.Item name="friends" />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item name="logout" />
          </Menu.Menu>
        </Menu>
      </Sticky>
    );
  }
}

export default withRouter(MainNavbar);
