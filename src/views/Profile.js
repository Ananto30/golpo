import React, { createContext } from "react";
import {
  Grid,
  Sticky,
  Ref,
  Dimmer,
  Loader,
  Button,
  Form,
  Header,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import PostFeed from "../components/PostFeed";
import ActivityFeed from "../components/ActivityFeed";
import UserCard from "../components/UserCard";
import client from "../client";

class Profile extends React.Component {
  contextRef = createContext();
  shareLines = [
    "Share a joke",
    "Tell them something",
    "Are you ok?",
    "Tell me, do you bleed?",
  ];
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userInfo: null,
      isLoading: true,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    let username = match.params.id;
    if (username == null) {
      username = "me";
    }
    client.Post.getByUsername(username).then((res) => {
      this.setState({
        posts: res.data.posts,
        isLoading: false,
      });
    });
    client.User.getByUsername(username).then((res) => {
      this.setState({
        userInfo: res.data,
      });

      this.props.commonStore.addUserImageCache(res.data);
    });
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
    const { posts, userInfo, isLoading } = this.state;
    const loggedUser = this.props.commonStore.loggedUser;
    const ownerProfile = userInfo && loggedUser.username === userInfo.username;
    return (
      <Ref innerRef={this.contextRef}>
        <Grid>
          <Grid.Column width={4}>
            <Sticky context={this.contextRef} offset={100}>
              {!userInfo ? (
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              ) : (
                <UserCard userInfo={userInfo} ownerProfile={ownerProfile} />
              )}
            </Sticky>
          </Grid.Column>
          <Grid.Column width={8}>
            {ownerProfile && (
              <Form id="postText" onSubmit={this.handlePost}>
                <Form.TextArea name="text" required rows={4}  />
                <Button
                  content={
                    this.shareLines[
                      Math.floor(Math.random() * this.shareLines.length)
                    ]
                  }
                  labelPosition="left"
                  icon="edit"
                  secondary
                />
              </Form>
            )}

            {isLoading ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            ) : posts.length === 0 ? (
              <Header as="h2" icon textAlign="center">
                This one doesn't like to share anything!
              </Header>
            ) : (
              <PostFeed posts={posts} />
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Sticky context={this.contextRef} offset={100}>
              <ActivityFeed />
            </Sticky>
          </Grid.Column>
        </Grid>
      </Ref>
    );
  }
}

export default inject("commonStore")(observer(withRouter(Profile)));
