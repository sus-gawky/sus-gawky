import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import BulletinBoard from '../components/BulletinBoard';
import UnityFrame from '../components/UnityFrame';
import LoadingSpinner from '../components/LoadingSpinner';

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
    return {
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="neighbors-page" fluid className="py-3">
      <Row className="align-middle">
        <Col xs={12} className="title">
          Neighborhood
        </Col>
      </Row>
      <Row className="align-middle text-center">
        <Col xs={3} className="d-flex flex-column justify-content-center">
          <UnityFrame score={0} />
          <Button variant="success">Score</Button>
        </Col>

        <Col xs={5} className="d-flex flex-column justify-content-center">
          <BulletinBoard />
        </Col>
        <Col xs={4} className="d-flex flex-column justify-content-center">
          <h2>Leaderboard</h2>
          <p>1) ___________________________</p>
          <p>2) ___________________________</p>
          <p>3) ___________________________</p>
          <p>4) ___________________________</p>
          <p>5) ___________________________</p>
          <p>6) ___________________________</p>
          <p>7) ___________________________</p>
          <p>8) ___________________________</p>
          <p>9) ___________________________</p>
          <p>10) ___________________________</p>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Neighbors;
