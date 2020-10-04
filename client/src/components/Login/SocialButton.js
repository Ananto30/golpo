import React from "react";
import { Button } from "semantic-ui-react";
import SocialLogin from "react-social-login";

class SocialButton extends React.Component {
  render() {
    return (
      <Button onClick={this.props.triggerLogin} {...this.props}>
        {this.props.children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);
