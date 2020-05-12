import { inject, observer } from "mobx-react";

import CalenderMoment from "../CalenderMoment";
import { IMAGE_LARGE } from "../../defaults";
import { Item } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";

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
              : IMAGE_LARGE
          }
          // avatar
          as={Link}
          to={`/profile/${post.author}`}
        />

        <Item.Content>
          <Item.Header
            as={Link}
            to={`/profile/${post.author}`}
            style={{ fontFamily: "monospace" }}
          >
            {post.author}
          </Item.Header>
          <Item.Meta>
            <CalenderMoment time={post.date} />
          </Item.Meta>
          <Item.Description style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}>
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
