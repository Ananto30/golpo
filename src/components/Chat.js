import React from "react";
import { Comment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CalenderMoment from "./CalenderMoment";

import { inject, observer } from "mobx-react";

class Chat extends React.Component {
  render() {
    const chat = this.props.chat;
    return (
      <Comment>
        <Comment.Avatar
          src={
            this.props.commonStore.usersImageCache &&
            chat.from in this.props.commonStore.usersImageCache
              ? `/images/avatar/small/${
                  this.props.commonStore.usersImageCache[chat.from]
                }`
              : "/images/avatar/small/stevie.jpg"
          }
        />
        <Comment.Content>
          <Comment.Author as={Link} to={`/profile/${chat.from}`}>
            {chat.from}
          </Comment.Author>
          <Comment.Metadata>
            <div>
              <CalenderMoment time={chat.date} />
            </div>
            {chat.seen && (
              <div>
                <Icon name="check" size="tiny" />
              </div>
            )}
          </Comment.Metadata>
          <Comment.Text>{chat.text}</Comment.Text>

          {/* <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions> */}
        </Comment.Content>
      </Comment>
    );
  }
}

export default inject("commonStore")(observer(Chat));
