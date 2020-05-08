import React from "react";

import { Container } from "semantic-ui-react";
import Router from "./Router";

import StartSocketServer from "./socketClient";

class App extends React.Component {
  componentDidMount() {
    StartSocketServer();
  }
  render() {
    return (
      <Container style={{ maxHeight: "90vh" }}>
        <Router />
      </Container>
    );
  }
}

export default App;
