import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Praise } from '../../api/praise/Praise';
import AddPraiseModal from '../components/AddPraiseForm';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders the Praises page for adding a document. */
const Praises = () => {
  const { praises, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Praise.userPublicationName);
    const rdy = subscription.ready();
    const document = Praise.collection.find();
    return {
      praises: document,
      ready: rdy,
    };
  });

  const colorMatch = (type) => {
    const styles = {};
    switch (type) {
    case 'Shopping':
      styles.borderColor = 'yellow';
      break;
    case 'Food':
      styles.borderColor = 'lightgreen';
      break;
    case 'Transportation':
      styles.borderColor = 'lightblue';
      break;
    default:
      break;
    }
    return styles;
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col>
            <AddPraiseModal />
          </Col>
          <Col>
            <Container style={{ backgroundColor: '#F5F5F5' }}>
              {praises.map((praise) => (
                <Card style={colorMatch(praise.category)} className="my-3">
                  <Card.Body>
                    Date Created: {praise.dateCreated.toLocaleDateString()}
                  </Card.Body>
                  <Card.Body>
                    {praise.comment}
                  </Card.Body>
                  <Card.Footer>
                  </Card.Footer>
                </Card>
              ))}
            </Container>
          </Col>
        </Col>
      </Row>
    </Container>
  ) : (<LoadingSpinner />);
};

export default Praises;
