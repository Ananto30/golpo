import React from "react";
import { Placeholder } from "semantic-ui-react";

const ActivityPlaceholder = () => (
  <Placeholder>
    {Array.from({ length: 5 }, (_, k) => (
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
    ))}
  </Placeholder>
);

export default ActivityPlaceholder;
