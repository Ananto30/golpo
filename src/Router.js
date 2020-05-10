import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
import Home from "./views/Home";
import Chat from "./views/Chat";
import PrivateRoute from "./components/PrivateRoute";
import SinglePost from "./views/SinglePost";
import Login from "./views/login";
import Profile from "./views/Profile";
import Users from "./views/Users";

import ActivityLayout from "./layouts/ActivityLayout";
import GoogleLogin from "./views/GoogleLogin";
import NavigationLayout from "./layouts/NavigationLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={routes.login}
          exact
          render={(props) => <Login {...props} />}
        />

        <Route
          path="/google/auth/:email"
          exact
          render={(props) => <GoogleLogin {...props} />}
        />

        <PrivateRoute>
          <ActivityLayout path="/" exact component={Home} />

          <ActivityLayout path={routes.home} exact component={Home} />
          <ActivityLayout path={routes.profile} exact component={Profile} />
          <ActivityLayout
            path={`${routes.profile}/:id`}
            exact
            component={Profile}
          />
          <NavigationLayout path={routes.message} exact component={Chat} />
          <ActivityLayout path={routes.users} exact component={Users} />
          <ActivityLayout
            path={`${routes.post}/:id`}
            exact
            component={SinglePost}
          />
        </PrivateRoute>

        <Redirect to={routes.home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
