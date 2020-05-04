import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Grid, Image, Container, Feed, Icon, Item } from "semantic-ui-react";
import Router from "./Router";
import MainNavbar from "./components/MainNavbar";

function App() {
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;
