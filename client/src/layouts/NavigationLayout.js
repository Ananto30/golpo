import React from "react";
import { Route } from "react-router";
import MainNavbar from "../components/Navigation/MainNavbar";

const NavigationLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <>
        <MainNavbar />
        <Component {...props} />
      </>
    )}
  />
);

export default NavigationLayout;
