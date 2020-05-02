import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Grid, Image, Container, Feed, Icon, Item} from 'semantic-ui-react'
import StickyLayout from "./layouts/StickyLayout";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import PostFeed from "./components/PostFeed";
import Home from "./views/Home";
import SinglePost from "./views/SinglePost";
import Chat from "./views/Chat";

function App() {
  return (
    <Container>
      <Menu secondary
        // fixed="top"
            attached="top"
            style={{height: "100px", border: "none"}}
      >
        <Menu.Item
          name='home'
        />
        <Menu.Item
          name='messages'
        />
        <Menu.Item
          name='friends'
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...'/>
          </Menu.Item>
          <Menu.Item
            name='logout'
          />
        </Menu.Menu>
      </Menu>
      {/*<Home/>*/}
      {/*<SinglePost/>*/}
      <Chat/>
    </Container>
  );
}


export default App;
