import React, { createContext } from "react";
import { Grid, Dimmer, Loader, Ref, Sticky, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ActivityFeed from "../components/ActivityFeed";
import client from "../client";
import dflt from "../defaults";

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
    });
  }

  render() {
    const { users } = this.state;
    return (
      <Ref innerRef={this.contextRef}>
        <Grid>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={4}>
              {users.map((user) => (
                <Card
                  as={Link}
                  to={`/profile/${user.username}`}
                  image={
                    user.image
                      ? `/images/avatar/large/${user.image}`
                      : dflt.image
                  }
                  header={user.username}
                  meta={user.work ? user.work : dflt.work}
                  description={user.tagline ? user.tagline : dflt.tagline}
                  // extra="mama"
                />
              ))}
            </Card.Group>
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

export default Users;
