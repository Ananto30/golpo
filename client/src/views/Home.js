import React, { createContext } from "react";
import { Grid } from "semantic-ui-react";

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

  async componentDidMount() {
    try {
      let res = await client.Post.getAll();
      this.setState({
        posts: res.data.posts,
      });

      let usernames = res.data.posts.map(({ author }) => author);
      const usernamesSet = new Set(usernames);
      usernames = [...usernamesSet];

      res = await client.User.getUsersMeta(usernames);
      this.props.commonStore.updateImageCache(res.data.users);

      res = await client.User.getByUsername("me");
      this.setState({
        userInfo: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { posts, userInfo } = this.state;
    return (
      <>
        <Grid.Column width={4} only="computer">
          <Loading loading={!userInfo} component={CardPlaceholder}>
            <UserCard userInfo={userInfo} ownerProfile={true} />
          </Loading>
        </Grid.Column>
        <Grid.Column
          // width={8}
          className={styles.chatmenu}
          mobile={16}
          computer={8}
        >
          <Loading loading={posts.length === 0} component={ItemPlaceholder} />
          <PostFeed posts={posts} />
        </Grid.Column>
      </>
    );
  }
}

export default inject("commonStore")(observer(Home));
