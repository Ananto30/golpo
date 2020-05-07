import React from "react";
import { Item } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { inject, observer } from "mobx-react";

import CalenderMoment from "./CalenderMoment";
import dflt from "../defaults";

class Post extends React.Component {
  render() {
    const post = this.props.post;
    const imageCache = this.props.commonStore.usersImageCache;
    return (
      <Item>
        <Item.Image
          size="tiny"
          src={
            imageCache && post.author in imageCache
              ? `/images/avatar/large/${imageCache[post.author]}`
              : dflt.image
          }
          avatar
          as={Link}
          to={`/profile/${post.author}`}
        />

        <Item.Content>
          <Item.Header as={Link} to={`/profile/${post.author}`}>
            {post.author}
          </Item.Header>
          <Item.Meta>
            <CalenderMoment time={post.date} />
          </Item.Meta>
          <Item.Description style={{ whiteSpace: "pre-line" }}>
            {post.text}
          </Item.Description>
          {post.comments != null && (
            <Item.Extra
              as={Link}
              to={`/post/${post._id}`}
              style={{ color: "#4183c4" }}
            >
              {post.comments} comments
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    );
  }
}

export default inject("commonStore")(observer(Post));
