import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/User';
import LoadingSpinner from '../components/LoadingSpinner';
import StoreNavigation from '../components/StoreNavigation';

/* A simple static component to render some text for the landing page. */
const Store = () => {

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

  return (ready ? (
    <div>
      <Container id="landing-page" fluid className="py-3">
        <Row className="align-middle text-center">
          <Col />
          <Col />
          <Col>
            <h1 className="fredoka-one text-center store-title">Store</h1>
          </Col>
          <Col />
          <Col>
            <Row>
              <Col className="float-start">
                <h6 className="text-center fredoka-one currency">
                  <span className="badge bg-dark">
                    Points: {' '}
                    {currentUser.points}
                  </span>
                </h6>
              </Col>
              <Col />
            </Row>
          </Col>
        </Row>
        <Row className="ribbon-body">
          <div id="bottom">
            <header className="ribbon-container">
              <h2 className="ribbon">
                <span className="ribbon-content">For personal or charitable fun</span>
              </h2>
            </header>
          </div>
        </Row>
        <Row className="justify-content-center">
          <StoreNavigation />
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default Store;
