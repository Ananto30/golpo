import { Button, Divider, Grid, Header, Icon, Image } from "semantic-ui-react";
import { Redirect, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import React from "react";
import client from "../client";
import routes from "../routes";
import { LoginForm } from "../components/LoginForm";
import SocialButton from "../components/Login/SocialButton";

class Login extends React.Component {
  state = {
    error: null,
    requestInit: false,
  };

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

  handleSocialLogin = async (user) => {
    let res = await client.Auth.googleLogin(user);
    if (res.status === 200) {
      this.props.commonStore.setAuthToken(res.data.access_token);

      res = await client.User.getByUsername("me");
      this.props.commonStore.setLoggedUser({
        username: res.data.username,
      });
      this.props.history.push(routes.home);
    }
    console.log(user);
  };

  handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  render() {
    const { error, requestInit } = this.state;
    const authToken = this.props.commonStore.authToken;

    if (authToken) return <Redirect to={routes.home} />;

    return (
      <Grid centered>
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row>
          <Grid.Column
            computer={4}
            mobile={12}
            // style={{ paddingTop: "10%" }}
            verticalAlign="middle"
          >
            <Header as="h2" icon textAlign="center">
              {/* <Icon name="users" circular /> */}
              <Image src="/images/cb.jpg" />
              <Header.Content>Golpo13</Header.Content>

              <Header.Subheader>
                Just another social media who doesn't sell your data{" "}
                <span role="img">😐</span>
              </Header.Subheader>
            </Header>

            <br />
            <br />

            <LoginForm
              handleLogin={this.handleLogin}
              error={error}
              requestInit={requestInit}
            />

            <Divider horizontal>Or</Divider>

            <SocialButton
              color="google plus"
              disabled={requestInit}
              loading={requestInit}
              // onClick={this.handleGoogleLogin}
              provider="google"
              appId="841514079806-51ct22q1avsaca08sgdiup3fj33adsi2.apps.googleusercontent.com"
              onLoginSuccess={this.handleSocialLogin}
              onLoginFailure={this.handleSocialLoginFailure}
              // scope={"https://www.googleapis.com/auth/user.gender.read"}
            >
              <Icon name="google" /> Login with Google
            </SocialButton>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default inject("commonStore")(observer(withRouter(Login)));
