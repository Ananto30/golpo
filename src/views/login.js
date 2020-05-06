import React from "react";
import { Button, Checkbox, Form, Grid, Message } from "semantic-ui-react";

import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import client from "../client";
import routes from "../routes";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  handleLogin = (e) => {
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
        if (err.response.data) {
          this.setState({ error: err.response.data.errors });
        }
      });
  };
  render() {
    const { error } = this.state;
    return (
      <Grid centered>
        <Grid.Column width={4} style={{paddingTop: "10%"}}>
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

            <Button type="submit">Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
export default inject("commonStore")(observer(withRouter(Login)));
