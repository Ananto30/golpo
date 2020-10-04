import { Input, Menu, Sidebar, Sticky } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import React from "react";
import routes from "../../routes";

class MainNavbar extends React.Component {
  state = {
    // activeItem: this.props.location.pathname.substring(1),
    activeItem: window.location.pathname.substring(1),
    isMobile: false,
    sidebarVisible: false,
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

  handleWindowResize = () => {
    // TODO: Need to fix the width, currently working
    this.setState({ isMobile: window.innerWidth < 767 });
  };

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleSidebarVisible = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  };

  render() {
    const { activeItem, isMobile, sidebarVisible } = this.state;
    const loggedUser = this.props.commonStore.loggedUser;
    return (
      <Sticky>
        {isMobile ? (
          <>
            <Menu
              secondary
              style={{
                height: "10vh",
                border: "none",
                backgroundColor: "#fff",
                fontFamily: "monospace",
              }}
            >
              <Menu.Menu position="right">
                <Menu.Item>
                  <Input icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item name="menu" onClick={this.handleSidebarVisible} />
              </Menu.Menu>
            </Menu>
            {/* <Sidebar.Pushable as={Segment}> */}
            <Sidebar
              as={Menu}
              animation="uncover"
              direction="left"
              vertical
              visible={sidebarVisible}
              width="thin"
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
              {loggedUser ? (
                <Menu.Item name="logout" onClick={this.handleLogout} />
              ) : (
                <Menu.Item name="login" as={Link} to={routes.login} />
              )}
            </Sidebar>
            {/* </Sidebar.Pushable> */}
          </>
        ) : (
          <Menu
            secondary
            style={{
              height: "100px",
              border: "none",
              backgroundColor: "#fff",
              fontFamily: "monospace",
            }}
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
        )}
      </Sticky>
    );
  }
}

export default inject("commonStore")(observer(withRouter(MainNavbar)));
