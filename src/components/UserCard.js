import Card from "semantic-ui-react/dist/commonjs/views/Card";
import React from "react";

const UserCard = () => (
  <Card
    image='/images/avatar/large/elliot.jpg'
    header='Elliot Baker'
    meta='Friend'
    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    extra="this is extra"
  />
)

export default UserCard