import React from "react";

const Loading = ({ component: Component, loading, ...props }) => (
  <>{loading ? <Component /> : props.children}</>
);

export default Loading;
