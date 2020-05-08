import React, { createContext } from "react";
import { Grid, Dimmer, Loader } from "semantic-ui-react";

import { inject, observer } from "mobx-react";

import PostFeed from "../components/PostFeed";
import UserCard from "../components/UserCard";
import client from "../client";
import styles from "../chat.module.css";
import ItemPlaceholder from "../components/Loaders/ItemPlaceholder";
import Loading from "../components/Loaders/Loading";
import CardPlaceholder from "../components/Loaders/CardPlaceholder";

class Home extends React.Component {
  contextRef = createContext();
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userInfo: null,
    };
  }

  componentDidMount() {
    client.Post.getAll().then((res) => {
      this.setState({
        posts: res.data.posts,
      });

      let usernames = res.data.posts.map(({ author }) => author);
      const usernamesSet = new Set(usernames);
      usernames = [...usernamesSet];

      client.User.getUsersMeta(usernames).then((res) => {
        this.props.commonStore.updateImageCache(res.data.users);
      });
    });
    client.User.getByUsername("me").then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  }

  render() {
    const { posts, userInfo } = this.state;
    return (
      <>
        <Grid.Column width={4} only='large screen'>
          <Loading loading={!userInfo} component={CardPlaceholder}>
            <UserCard userInfo={userInfo} ownerProfile={true} />
          </Loading>
        </Grid.Column>
        <Grid.Column width={8} className={styles.chatmenu} mobile={16} largeScreen={8}>
          <Loading loading={posts.length === 0} component={ItemPlaceholder} />
          <PostFeed posts={posts} />
        </Grid.Column>
      </>
    );
  }
}

export default inject("commonStore")(observer(Home));
