import React from "react";
import { Button, Checkbox, Form, Grid } from "semantic-ui-react";

import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import client from "../client";
import routes from "../routes";

class Login extends React.Component {
  handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    client.Auth.login(data.get("username"), data.get("password"))
      .then((res) => {
        if (res.status === 200) {
          this.props.commonStore.setAuthToken(res.data.access_token);
          //   client.User.getById("me")
          //     .then((res) => {
          //       if (res.status === 200) {
          this.props.commonStore.setLoggedUser({
            username: data.get("username"),
          });
          //       }
          //     })
          //     .catch(console.log);
          this.props.history.push(routes.home);
        }
      })
      .catch(console.log);
  };
  render() {
    return (
      <Grid centered>
        <Grid.Column width={4}>
          <Form onSubmit={this.handleLogin}>
            <Form.Field>
              <label>Username</label>
              <input name="username" placeholder="Username" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" />
            </Form.Field>
            <Form.Field>
              <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
export default inject("commonStore")(observer(withRouter(Login)));
