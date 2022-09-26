import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Challenges } from '../../api/challenge/Challenge';
import ChallengeItem from '../components/ChallengeItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListChallenges = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, challenges } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Challenges.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const challengeItems = Challenges.collection.find({}).fetch();
    return {
      challenges: challengeItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Challenges</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Challenge</th>
                <th>Description</th>
                <th>Tags</th>
                <th>End Date</th>
                <th>Points</th>
                <th>Users who are already Signed Up</th>
                <th>Sign Up</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => <ChallengeItem key={challenge._id} challenge={challenge} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListChallenges;
