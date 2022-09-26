import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

/** Displays messages and an addMessage field if readOnly = false */
const BulletinBoard = () => (
  <Container>
    <Row className="justify-content-md-center">
      <Spinner animation="border" />
      Getting data
    </Row>
  </Container>
);

export default BulletinBoard;
