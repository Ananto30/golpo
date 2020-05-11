import React from "react";
import { Placeholder, Card, Button } from "semantic-ui-react";

const CardListPlaceholder = () => (
  <Card.Group itemsPerRow={4} doubling>
    {Array.from({ length: 8 }, (_, k) => (
      <Card key={k}>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
          <Button disabled loading>
            Loading
          </Button>
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
);

export default CardListPlaceholder;
