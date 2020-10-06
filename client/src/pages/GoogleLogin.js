import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import React from "react";
import client from "../client";
import routes from "../routes";

class GoogleLogin extends React.Component {
  async componentDidMount() {
    try {
    //   const { match } = this.props;
    //   let urlParams = match.params;

      let code = this.useQuery().get("code");

      let res = await client.Auth.getTokenByGoogleCode(code);
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

  useQuery() {
    return new URLSearchParams(window.location.search);
  }

  render() {
    return <h3>Please wait, you will be redirected</h3>;
  }
}

export default inject("commonStore")(observer(withRouter(GoogleLogin)));
