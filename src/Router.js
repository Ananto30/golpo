import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
import Home from "./views/Home";
import Chat from "./views/Chat";
import MainNavbar from "./components/MainNavbar";
import PrivateRoute from "./components/PrivateRoute";
import SinglePost from "./views/SinglePost";
import Login from "./views/login";
import Profile from "./views/Profile";
import Users from "./views/Users";

import ActivityLayout from "./layouts/ActivityLayout";
import GoogleLogin from "./views/GoogleLogin";

const Router = () => {
  return (
    <BrowserRouter>
      <MainNavbar />
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
          <Route path="/" exact render={(props) => <Home {...props} />} />

          <ActivityLayout
            path={routes.home}
            exact
            component={Home}
            // render={(props) => <Home {...props} />}
          />
          <ActivityLayout
            path={routes.profile}
            exact
            component={Profile}
            // render={(props) => <Profile {...props} />}
          />
          <ActivityLayout
            path={`${routes.profile}/:id`}
            exact
            component={Profile}
            // render={(props) => <Profile {...props} />}
          />
          <Route
            path={routes.message}
            exact
            component={Chat}
            // render={(props) => <Chat {...props} />}
          />
          <ActivityLayout
            path={routes.users}
            exact
            component={Users}
            // render={(props) => <Users {...props} />}
          />
          <ActivityLayout
            path={`${routes.post}/:id`}
            exact
            component={SinglePost}
            // render={(props) => <SinglePost {...props} />}
          />
        </PrivateRoute>

        {/* <Redirect to={routes.home} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
