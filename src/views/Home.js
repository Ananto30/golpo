import React, { createContext } from "react";
import { Grid, Sticky, Ref, Dimmer, Loader } from "semantic-ui-react";
import PostFeed from "../components/PostFeed";
import ActivityFeed from "../components/ActivityFeed";
import UserCard from "../components/UserCard";
import client from "../client";

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
    });
    client.User.getByUsername("me").then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  }
  componentDidUpdate() {}
  render() {
    const { posts, userInfo } = this.state;
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
                <UserCard userInfo={userInfo} ownerProfile={true} />
              )}
            </Sticky>
          </Grid.Column>
          <Grid.Column width={8}>
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

export default Home;
