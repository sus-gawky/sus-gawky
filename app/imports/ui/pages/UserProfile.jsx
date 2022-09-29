import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import LoadingSpinner from '../components/LoadingSpinner';
import Functions from '../../api/functions/functions';

/* A simple static component to render some text for the landing page. */
const UserProfile = () => {
  const { ready, currentUser } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    return {
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (ready ? (
    <div>
      <div id="landing-page" style={{ backgroundImage: 'url(\'../../images/background2.png\')' }}>
        <Container style={{ paddingLeft: 80 }}>
          <div className="fredoka-one pt-5">
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <div>
            level {Functions.getLvlInfo(currentUser).level}
          </div>
          <div>
            {capitalizeFirstLetter(currentUser.city)}, {currentUser.zipCode}
          </div>
          <div>
            {currentUser.owner}
          </div>
          <div>
            Points: {currentUser.points}
          </div>
          <div>
            <div className="fredoka-one pt-5">
              Prizes (NFT's) Earned
            </div>
            {currentUser.swag.map((swag, index) => (
              <span className="float-start me-3 mt-3">
                <Card key={index} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={swag.src} />
                  <Card.Body>
                    <Card.Title>{swag.desc}</Card.Title>
                  </Card.Body>
                </Card>
              </span>
            ))}
          </div>
        </Container>
      </div>
    </div>
  ) : <LoadingSpinner />);
};

export default UserProfile;
