import React from "react";

import { inject, observer } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import { Sticky, Menu, Input } from "semantic-ui-react";

import routes from "../routes";

class MainNavbar extends React.Component {
  state = {
    activeItem: this.props.location.pathname.substring(1),
  };

  handleMenuClick = (e, { name }) => {
    this.setState({ activeItem: name });
    // this.props.history.push("/" + name);
  };

  handleLogout = (e) => {
    e.preventDefault();
    this.props.commonStore.resetAuth();
    this.setState({ activeItem: null });
    this.props.history.push(routes.login);
  };

  render() {
    const { activeItem } = this.state;
    const loggedUser = this.props.commonStore.loggedUser;

    return (
      <Sticky>
        <Menu
          secondary
          style={{ height: "100px", border: "none", backgroundColor: "#fff" }}
          
        >
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleMenuClick}
            as={Link}
            to={routes.home}
          />
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={this.handleMenuClick}
            as={Link}
            to={routes.profile}
          />
          <Menu.Item
            name="message"
            active={activeItem === "message"}
            onClick={this.handleMenuClick}
            as={Link}
            to={routes.message}
          />
          <Menu.Item
            name="users"
            active={activeItem === "users"}
            onClick={this.handleMenuClick}
            as={Link}
            to={routes.users}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            {loggedUser ? (
              <Menu.Item name="logout" onClick={this.handleLogout} />
            ) : (
              <Menu.Item name="login" as={Link} to={routes.login} />
            )}
          </Menu.Menu>
        </Menu>
       </Sticky>
    );
  }
}

export default inject("commonStore")(observer(withRouter(MainNavbar)));
