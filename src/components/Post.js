import React from "react";
import { Item } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CalenderMoment from "./CalenderMoment";

import { inject, observer } from "mobx-react";

class Post extends React.Component {
  render() {
    const post = this.props.post;
    return (
      <Item>
        <Item.Image
          size="tiny"
          src={
            this.props.commonStore.usersImageCache &&
            post.author in this.props.commonStore.usersImageCache
              ? `/images/avatar/large/${
                  this.props.commonStore.usersImageCache[post.author]
                }`
              : "/images/avatar/large/stevie.jpg"
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
