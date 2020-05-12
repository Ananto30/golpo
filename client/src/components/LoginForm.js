import {Button, Checkbox, Form, Message} from "semantic-ui-react";
import React from "react";

export const LoginForm = (props) => (
  <Form onSubmit={props.handleLogin} error={props.error}>
    {props.error && (
      <Message
        error
        header={props.error}
        content="I think you do forget everything :|"
      />
    )}
    <Form.Field>
      <label>Username</label>
      <input name="username" placeholder="Username"/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" name="password" placeholder="Password"/>
    </Form.Field>
    <Form.Field>
      <Checkbox label="I agree to the Terms and Conditions" defaultChecked/>
    </Form.Field>

    <Button
      type="submit"
      disabled={props.requestInit}
      loading={props.requestInit}
    >
      Login
    </Button>
  </Form>
);