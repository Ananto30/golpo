import * as React from "react";
import { Grid, Item } from "semantic-ui-react";
import PostFeed from "../components/PostFeed";
import ActivityFeed from "../components/ActivityFeed";
import UserCard from "../components/UserCard";
import PostComment from "../components/PostComment";
import { withRouter } from "react-router-dom";
import CalenderMoment from "../components/CalenderMoment";

import client from "../client.js";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postAuthor: "",
      postDate: "",
      postText: "",
      postComments: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const postId = match.params.id;

    client.Post.getById(postId).then((res) => {
      console.log(res.data);
      this.setState({
        postAuthor: res.data.author,
        postDate: res.data.date,
        postText: res.data.text,
        postComments: res.data.comments,
      });
    });
  }

  render() {
    const { postAuthor, postDate, postText, postComments } = this.state;
    return (
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" src="/images/avatar/large/stevie.jpg" />

              <Item.Content>
                <Item.Header>{postAuthor}</Item.Header>
                <Item.Meta>
                  <CalenderMoment time={postDate} />
                </Item.Meta>
                <Item.Description>{postText}</Item.Description>
                {/* <Item.Extra>{postComments.length}</Item.Extra> */}
              </Item.Content>
            </Item>
          </Item.Group>
          <PostComment comments={postComments} />
        </Grid.Column>
        <Grid.Column width={4}>
          <ActivityFeed />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(SinglePost);
