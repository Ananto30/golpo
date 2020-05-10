import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Message,
  Icon,
  Divider,
  Header,
  Image
} from "semantic-ui-react";

import { withRouter, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import client from "../client";
import routes from "../routes";

import socket from "../socketClient";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      requestInit: false,
    };
  }
  handleLogin = (e) => {
    this.setState({ requestInit: true });
    e.preventDefault();
    const data = new FormData(e.target);
    client.Auth.login(data.get("username"), data.get("password"))
      .then((res) => {
        if (res.status === 200) {
          this.props.commonStore.setAuthToken(res.data.access_token);
          this.props.commonStore.setLoggedUser({
            username: data.get("username"),
          });
          this.props.history.push(routes.home);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          this.setState({
            error: err.response.data.errors,
            requestInit: false,
          });
        }
      });
  };
  handleGoogleLogin = (e) => {
    this.setState({ requestInit: true });
  };
  render() {
    const { error, requestInit } = this.state;
    const authToken = this.props.commonStore.authToken;

    if (authToken) return <Redirect to={routes.home} />;

    return (
      <Grid centered>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row>
          <Grid.Column
            largeScreen={4}
            mobile={12}
            // style={{ paddingTop: "10%" }}
            verticalAlign="middle"
          >
            <Header as="h2" icon textAlign="center">
              {/* <Icon name="users" circular /> */}
              <Image src="/images/cb.jpg"></Image>
              <Header.Content>Golpo13</Header.Content>

              <Header.Subheader>
                Just another social media who doesn't sell your data{" "}
                <span role="img">😐</span>
              </Header.Subheader>
            </Header>

            <br></br>
            <br></br>

            <Form onSubmit={this.handleLogin} error={error}>
              {error && (
                <Message
                  error
                  header={error}
                  content="I think you do forget everything :|"
                />
              )}
              <Form.Field>
                <label>Username</label>
                <input name="username" placeholder="Username" />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="I agree to the Terms and Conditions"
                  defaultChecked
                />
              </Form.Field>

              <Button
                type="submit"
                disabled={requestInit}
                loading={requestInit}
              >
                Login
              </Button>
            </Form>

            <Divider horizontal>Or</Divider>

            <Button
              color="google plus"
              href="/auth/social/google"
              disabled={requestInit}
              loading={requestInit}
              onClick={this.handleGoogleLogin}
            >
              <Icon name="google" /> Login with Google
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default inject("commonStore")(observer(withRouter(Login)));
