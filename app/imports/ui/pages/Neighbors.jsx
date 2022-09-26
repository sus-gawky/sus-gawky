import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import UnityFrame from '../components/UnityFrame';

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
);

export default Neighbors;
