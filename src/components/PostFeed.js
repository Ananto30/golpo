import {Item} from "semantic-ui-react";
import React from "react";

const PostFeed = () => (
  <Item.Group link divided>
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

    <Item>
      <Item.Image size='tiny' src='/images/avatar/large/veronika.jpg'/>

      <Item.Content>
        <Item.Header>Veronika Ossi</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>habijabi</Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='tiny' src='/images/avatar/large/jenny.jpg'/>

      <Item.Content>
        <Item.Header>Jenny Hess</Item.Header>
        <Item.Description>habijabi</Item.Description>
      </Item.Content>
    </Item>

  </Item.Group>
)

export default PostFeed