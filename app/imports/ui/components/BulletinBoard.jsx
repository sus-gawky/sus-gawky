import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Feed } from 'semantic-ui-react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useTracker } from 'meteor/react-meteor-data';
import { Bulletins } from '../../api/bulletin/Bulletin';
import { Users } from '../../api/user/User';
import Bulletin from './Bulletin';
import LoadingSpinner from './LoadingSpinner';

/** Displays messages and an addMessage field if readOnly = false */
const BulletinBoard = () => {
  const { ready, bulletins, currentUser, users } = useTracker(() => {
    const subscription1 = Meteor.subscribe(Bulletins.userPublicationName);
    const subscription2 = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready();
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    const bulletinItems = Bulletins.collection.find({ zipCode: currentUserItem.zipCode }).fetch();
    return {
      bulletins: bulletinItems,
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      zipCode: {currentUser.zipCode}
      <h2>Neighborhood Chat {currentUser.firstName}</h2>
      <Feed>
        {bulletins.map((bulletin, index) => <Bulletin key={index} bulletin={bulletin} users={users} currentUser={currentUser} />)}
      </Feed>
      <Button variant="outline-success">Success</Button>
      <Button variant="success">Success</Button>
    </Container>
  ) : <LoadingSpinner />);
};

export default BulletinBoard;
