import * as React from "react";
import { Grid, Item, Dimmer, Loader } from "semantic-ui-react";
import PostComment from "../components/PostComment";
import { withRouter } from "react-router-dom";

import client from "../client.js";
import Post from "../components/Post";
import Loading from "../components/Loaders/Loading";
import ItemPlaceholder from "../components/Loaders/ItemPlaceholder";

import styles from "../chat.module.css";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      postComments: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const postId = match.params.id;

    client.Post.getById(postId).then((res) => {
      this.setState({
        post: {
          id: res.data._id,
          author: res.data.author,
          text: res.data.text,
          date: res.data.date,
        },
        postComments: res.data.comments,
      });
    });
  }

  handleComment = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    client.Post.createComment(this.state.post.id, data.get("text")).then(
      (res) => {
        this.setState({
          postComments: res.data.comments,
        });
        // TODO: this seems a bit shitty
        document.getElementById("commentText").reset();
      }
    );
  };

  render() {
    const { post, postComments } = this.state;
    return (
      <Grid.Column width={12} className={styles.chatmenu}>
        <Loading loading={!post} component={ItemPlaceholder}>
          <>
            <Item.Group>
              <Post post={post} />
            </Item.Group>
            <PostComment
              comments={postComments}
              handleComment={this.handleComment}
            />
          </>
        </Loading>
      </Grid.Column>
    );
  }
}

export default withRouter(SinglePost);
