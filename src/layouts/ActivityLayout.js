import React from "react";
import { Route } from "react-router";
import { Grid } from "semantic-ui-react";
import styles from "../chat.module.css";

import ActivityFeed from "../components/ActivityFeed/ActivityFeed";
import MainNavbar from "../components/MainNavbar";

const ActivityLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <>
        <MainNavbar />
        <Grid stackable>
          <Component {...props} />
          <Grid.Column
            width={4}
            className={styles.chathistory}
            only="large screen"
          >
            <ActivityFeed />
          </Grid.Column>
        </Grid>
      </>
    )}
  />
);

export default ActivityLayout;
