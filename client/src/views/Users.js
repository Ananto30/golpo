import React, { createContext } from "react";
import { Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { inject, observer } from "mobx-react";

import client from "../client";
import { IMAGE_LARGE, WORK, TAGLINE } from "../defaults";

import styles from "../chat.module.css";
import Loading from "../components/Loaders/Loading";

import CardListPlaceholder from "../components/Loaders/CardListPlaceholder";

class Users extends React.Component {
  contextRef = createContext();
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      let res = await client.User.getAllUsers();
      this.setState({
        users: res.data.users,
        isLoading: false,
      });
      this.props.commonStore.updateImageCache(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { users, isLoading } = this.state;
    return (
      <Grid.Column width={12} className={styles.chatmenu}>
        <Loading loading={isLoading} component={CardListPlaceholder} />
        <Card.Group itemsPerRow={4}>
          {users.map((user) => (
            <Card
              as={Link}
              to={`/profile/${user.username}`}
              image={
                user.image ? `/images/avatar/large/${user.image}` : IMAGE_LARGE
              }
              header={user.username}
              meta={user.work ? user.work : WORK}
              description={user.tagline ? user.tagline : TAGLINE}
              // extra="mama"
            />
          ))}
        </Card.Group>
      </Grid.Column>
    );
  }
}

export default inject("commonStore")(observer(Users));
