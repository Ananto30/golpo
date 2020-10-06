import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
import Home from "./pages/Home";
import Chat from "./pages/Message";
import PrivateRoute from "./components/PrivateRoute";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

import ActivityLayout from "./layouts/ActivityLayout";
import NavigationLayout from "./layouts/NavigationLayout";
import GoogleLogin from "./pages/GoogleLogin";

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
          path="/google/auth/callback"
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
