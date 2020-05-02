import * as React from "react";
import {Grid, Item} from "semantic-ui-react";
import PostFeed from "../components/PostFeed";
import ActivityFeed from "../components/ActivityFeed";
import UserCard from "../components/UserCard";
import PostComment from "../components/PostComment";

class SinglePost extends React.Component {
  render() {
    return (

      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item
              header="Stevie Feliciano">
              <Item.Image size='tiny' src='/images/avatar/large/stevie.jpg'/>

              <Item.Content>
                <Item.Header>Stevie Feliciano</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>habijabiasdf</Item.Description>
                <Item.Extra>Additional Details</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
          <PostComment/>
        </Grid.Column>
        <Grid.Column width={4}>
          <ActivityFeed/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SinglePost