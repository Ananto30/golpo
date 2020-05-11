import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

import React from "react";
import client from "../client";
import routes from "../routes";

class GoogleLogin extends React.Component {
  async componentDidMount() {
    try {
      const { match } = this.props;
      let email = match.params.email;

      let res = await client.Auth.getGoogleToken(email);
      const googleToken = res.data.access_token;

      res = await client.Auth.googleLogin(email, googleToken);
      if (res.status === 200) {
        this.props.commonStore.setAuthToken(res.data.access_token);

        res = await client.User.getByUsername("me");
        this.props.commonStore.setLoggedUser({
          username: res.data.username,
        });
        this.props.history.push(routes.home);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <h4>Please wait you will be redirected</h4>;
  }
}

export default inject("commonStore")(observer(withRouter(GoogleLogin)));
