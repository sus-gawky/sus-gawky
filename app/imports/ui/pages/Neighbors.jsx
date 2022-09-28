import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import BulletinBoard from '../components/BulletinBoard';
import UnityFrame from '../components/UnityFrame';
import LoadingSpinner from '../components/LoadingSpinner';
import LeaderBoard from '../components/LeaderBoard';
import Functions from '../../api/functions/functions';

/* A simple static component to render some text for the landing page. */
const Neighbors = () => {
  const { ready, users, currentUser } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    console.log('currentUserItem' + JSON.stringify(currentUserItem));
    return {
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  console.log(Functions.topTravelScores(users));
  return (ready ? (
    <Container id="neighbors-page" fluid className="py-3">
      <Row className="fredoka-one">
        <Col className="d-flex justify-content-center">Your neighborhood</Col>
      </Row>
      <Row className="align-middle text-center">
        <Col xs={6} className="d-flex flex-column justify-content-top" syle={{ paddingTop: 0 }}>
          <Col xs={12} className="fredoka-one" style={{ textAlign: 'center', fontSize: 'xx-large' }}>
            {currentUser.city} forum
          </Col>
          <BulletinBoard />
        </Col>
        <Col xs={6} style={{ paddingTop: '5em' }}>
          <UnityFrame score={100} givenHeight={300} givenWidth={640} />
          <Navbar sticky="top">
            <Stack>
              <div>
                <LeaderBoard className="mb-5" />
              </div>
            </Stack>
          </Navbar>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Neighbors;
