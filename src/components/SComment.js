import React from "react";
import { Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CalenderMoment from "./CalenderMoment";

import { inject, observer } from "mobx-react";

class SComment extends React.Component {
  render() {
    const comment = this.props.comment;
    return (
      <Comment>
        <Comment.Avatar
          src={
            this.props.commonStore.usersImageCache &&
            comment.author in this.props.commonStore.usersImageCache
              ? `/images/avatar/small/${
                  this.props.commonStore.usersImageCache[comment.author]
                }`
              : "/images/avatar/small/stevie.jpg"
          }
        />
        <Comment.Content>
          <Comment.Author as={Link} to={`/profile/${comment.author}`}>
            {comment.author}
          </Comment.Author>
          <Comment.Metadata>
            <div>
              <CalenderMoment time={comment.date} />
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.text}</Comment.Text>
          {/* <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions> */}
        </Comment.Content>
      </Comment>
    );
  }
}

export default inject("commonStore")(observer(SComment));
