import React from "react";

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import routes from "./routes";
import Home from "./views/Home";
import Chat from "./views/Chat";
import MainNavbar from "./components/MainNavbar";
import SinglePost from "./views/SinglePost";

const Router = () => {
  return (

    <BrowserRouter>
      <MainNavbar/>
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />}/>
        <Route
          path={routes.home}
          exact
          render={(props) => <Home {...props} />}
        />
        <Route
          path={routes.profile}
          exact
          render={(props) => <Home {...props} />}
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

        <Redirect to={routes.home}/>
      </Switch>
    </BrowserRouter>
  )

}

export default Router