import React, { createContext } from "react";
import {
  Grid,
  Sticky,
  Ref,
  Dimmer,
  Loader,
  Button,
  Form,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import PostFeed from "../components/PostFeed";
import ActivityFeed from "../components/ActivityFeed";
import UserCard from "../components/UserCard";
import client from "../client";

class Profile extends React.Component {
  contextRef = createContext();
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userInfo: null,
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
      });
    });
    client.User.getByUsername(username).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  }
  componentDidUpdate() {}
  render() {
    const { posts, userInfo } = this.state;
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
            {ownerProfile ? (
              <Form reply>
                <Form.TextArea />
                <Button
                  content="Share a joke!"
                  labelPosition="left"
                  icon="edit"
                  secondary
                />
              </Form>
            ) : null}

            {posts.length === 0 ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
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
