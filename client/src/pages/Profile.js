import {Button, Form, Grid, Header} from "semantic-ui-react";
import {inject, observer} from "mobx-react";

import CardPlaceholder from "../components/Loaders/CardPlaceholder";
import ItemPlaceholder from "../components/Loaders/ItemPlaceholder";
import Loading from "../components/Loaders/Loading";
import PostFeed from "../components/Post/PostFeed";
import React from "react";
import UserCard from "../components/Profile/UserCard";
import client from "../client";
import styles from "../chat.module.css";
import {withRouter} from "react-router-dom";

class Profile extends React.Component {
  shareLines = [
    "Share a joke",
    "Tell them something",
    "Are you ok?",
    "Tell me, do you bleed?",
  ];
  state = {
    posts: [],
    userInfo: null,
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const {match} = this.props;
      let username = match.params.id;
      if (username == null) {
        username = "me";
      }

      let res = await client.Post.getByUsername(username);
      this.setState({
        posts: res.data.posts,
        isLoading: false,
      });

      res = await client.User.getByUsername(username);
      this.setState({
        userInfo: res.data,
      });
      this.props.commonStore.addUserImageCache(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  handlePost = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    client.Post.createPost(data.get("text")).then((res) => {
      let data = res.data;
      data.comments = 0;
      this.setState((prev) => ({
        posts: [...prev.posts, data],
      }));
      // TODO: this seems a bit shitty
      document.getElementById("postText").reset();
    });
  };

  render() {
    const {posts, userInfo, isLoading} = this.state;
    const loggedUser = this.props.commonStore.loggedUser;
    const ownerProfile = userInfo && loggedUser.username === userInfo.username;
    return (
      <>
        <Grid.Column width={4}>
          <Loading loading={!userInfo} component={CardPlaceholder}>
            <UserCard userInfo={userInfo} ownerProfile={ownerProfile}/>
          </Loading>
        </Grid.Column>
        <Grid.Column width={8} className={styles.chatmenu}>
          <Loading loading={isLoading} component={ItemPlaceholder}>
            {ownerProfile && (
              <Form id="postText" onSubmit={this.handlePost}>
                <Form.TextArea name="text" required rows={4}/>
                <Button
                  content={
                    this.shareLines[
                      Math.floor(Math.random() * this.shareLines.length)
                      ]
                  }
                  labelPosition="left"
                  icon="edit"
                />
              </Form>
            )}

            {posts.length === 0 ? (
              <Header as="h2" icon textAlign="center">
                This one doesn't like to share anything!
              </Header>
            ) : (
              <PostFeed posts={posts}/>
            )}
          </Loading>
        </Grid.Column>
      </>
    );
  }
}

export default inject("commonStore")(observer(withRouter(Profile)));
