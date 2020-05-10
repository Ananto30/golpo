import React from "react";
import { Placeholder } from "semantic-ui-react";

const ItemPlaceholder = () => (
  <Placeholder>
    {Array.from({ length: 5 }, (_, k) => (
      <div key={k}>
        <Placeholder.Header image>
          <Placeholder.Line length="medium" />
          <Placeholder.Line length="full" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="medium" />
        </Placeholder.Paragraph>
      </div>
    ))}
  </Placeholder>
);

export default ItemPlaceholder;
