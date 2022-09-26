import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import LeaderBoard from '../components/LeaderBoard';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div>
    <LeaderBoard />
    <Container id="landing-page" fluid className="py-3">

      <Row className="align-middle text-center">
        <Col xs={4}>
          <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
        </Col>

      </Row>
    </Container>
  </div>
);

export default Landing;
