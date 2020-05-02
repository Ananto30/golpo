import * as React from "react";
import {Grid} from "semantic-ui-react";
import PostFeed from "../components/PostFeed";
import ActivityFeed from "../components/ActivityFeed";
import UserCard from "../components/UserCard";

class Home extends React.Component {
  render() {
    return (

      <Grid>
        <Grid.Column width={4}>
          <UserCard/>
        </Grid.Column>
        <Grid.Column width={8}>
          <PostFeed/>
        </Grid.Column>
        <Grid.Column width={4}>
          <ActivityFeed/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Home