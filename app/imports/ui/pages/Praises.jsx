import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import swal from 'sweetalert';
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

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Praises</h2></Col>
          <Col>
            <AddPraiseModal />
          </Col>
          <Col>
            <>
              {praises.map((praise) => (
                <Card>
                  <Card.Body>
                    Some Text
                  </Card.Body>
                  <Card.Footer>
                    Name
                    like emoji
                  </Card.Footer>
                </Card>
              ))}
            </>
          </Col>
        </Col>
      </Row>
    </Container>
  ) : (<LoadingSpinner />);
};

export default Praises;
