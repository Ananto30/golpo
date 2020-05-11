import React from "react";
import {inject, observer} from "mobx-react";

import CardPlaceholder from "../components/Loaders/CardPlaceholder";
import {Grid} from "semantic-ui-react";
import ItemPlaceholder from "../components/Loaders/ItemPlaceholder";
import Loading from "../components/Loaders/Loading";
import PostFeed from "../components/Post/PostFeed";
import UserCard from "../components/Profile/UserCard";
import client from "../client";
import styles from "../chat.module.css";

class Home extends React.Component {
  state = {
    posts: [],
    userInfo: null,
  };

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
        <Grid.Column className={styles.chatmenu} mobile={16} computer={8}>
          <Loading loading={posts.length === 0} component={ItemPlaceholder} />
          <PostFeed posts={posts} />
        </Grid.Column>
      </>
    );
  }
}

export default inject("commonStore")(observer(Home));
