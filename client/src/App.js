import { Container } from "semantic-ui-react";
import React from "react";
import Router from "./Router";
import socket from "./socketClient";

class App extends React.Component {
  componentDidMount() {
    socket.StartSocketServer();
  }
  render() {
    return (
      <Container style={{ maxHeight: "90vh", fontFamily: "monospace"}}>
        <Router />
      </Container>
    );
  }
}

export default App;
