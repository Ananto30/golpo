import React, { createContext } from "react";
import { Grid, Sticky, Ref, Dimmer, Loader } from "semantic-ui-react";

import { inject, observer } from "mobx-react";

import PostFeed from "../components/PostFeed";
import ActivityFeed from "../components/ActivityFeed";
import UserCard from "../components/UserCard";
import client from "../client";
import styles from "../chat.module.css";

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
      <Grid>
        <Grid.Column width={4}>
          {!userInfo ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <UserCard userInfo={userInfo} ownerProfile={true} />
          )}
        </Grid.Column>
        <Grid.Column width={8} className={styles.chatmenu}>
          {posts.length === 0 ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <PostFeed posts={posts} />
          )}
        </Grid.Column>
        <Grid.Column width={4} className={styles.chathistory}>
          <ActivityFeed />
        </Grid.Column>
      </Grid>
    );
  }
}

export default inject("commonStore")(observer(Home));
