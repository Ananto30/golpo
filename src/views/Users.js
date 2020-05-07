import React, { createContext } from "react";
import { Grid, Dimmer, Loader, Ref, Sticky, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { inject, observer } from "mobx-react";

import ActivityFeed from "../components/ActivityFeed";
import client from "../client";
import { IMAGE_LARGE, WORK, TAGLINE } from "../defaults";

class Users extends React.Component {
  contextRef = createContext();
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    client.User.getAllUsers().then((res) => {
      this.setState({
        users: res.data.users,
        isLoading: false,
      });
      this.props.commonStore.updateImageCache(res.data.users);
    });
  }

  render() {
    const { users, isLoading } = this.state;
    return (
      <Ref innerRef={this.contextRef}>
        <Grid>
          <Grid.Column width={12}>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            ) : (
              <Card.Group itemsPerRow={4}>
                {users.map((user) => (
                  <Card
                    as={Link}
                    to={`/profile/${user.username}`}
                    image={
                      user.image
                        ? `/images/avatar/large/${user.image}`
                        : IMAGE_LARGE
                    }
                    header={user.username}
                    meta={user.work ? user.work : WORK}
                    description={user.tagline ? user.tagline : TAGLINE}
                    // extra="mama"
                  />
                ))}
              </Card.Group>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Sticky context={this.contextRef} offset={100}>
              <ActivityFeed />
            </Sticky>
          </Grid.Column>
        </Grid>
      </Ref>
    );
  }
}

export default inject("commonStore")(observer(Users));
