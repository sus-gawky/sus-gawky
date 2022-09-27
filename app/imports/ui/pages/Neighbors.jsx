import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import UnityFrame from '../components/UnityFrame';
import LeaderBoard from '../components/LeaderBoard';

/* A simple static component to render some text for the landing page. */
const Neighbors = () => (
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
        <h2>Neighborhood Chat</h2>
        <p>--------------------------------------</p>
        <p>--------------------------------------</p>
        <p>--------------------------------------</p>
        <Button variant="outline-success">Success</Button>
        <Button variant="success">Success</Button>
      </Col>
      <Col xs={4} className="d-flex flex-column justify-content-center">
        <LeaderBoard />
      </Col>
    </Row>
  </Container>
);

export default Neighbors;
