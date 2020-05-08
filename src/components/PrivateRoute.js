import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

import { inject, observer } from "mobx-react";

import route from "../routes.js";

const PrivateRoute = (props) => (
  <Fragment>
    {props.commonStore.authToken !== null ? (
      props.children
    ) : (
      <Redirect to={route.login} />
    )}
  </Fragment>
);

export default inject("commonStore")(observer(PrivateRoute));
