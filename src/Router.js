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

const Router = () => {
  return (
    <BrowserRouter>
      <MainNavbar />

      <Route
        path={routes.login}
        exact
        render={(props) => <Login {...props} />}
      />
      <Switch>
        <PrivateRoute>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path={routes.home}
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path={routes.profile}
            exact
            render={(props) => <Profile {...props} />}
          />
          <Route
            path={`${routes.profile}/:id`}
            exact
            render={(props) => <Profile {...props} />}
          />
          <Route
            path={routes.message}
            exact
            render={(props) => <Chat {...props} />}
          />
          <Route
            path={`${routes.post}/:id`}
            exact
            render={(props) => <SinglePost {...props} />}
          />
        </PrivateRoute>

        <Redirect to={routes.home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
