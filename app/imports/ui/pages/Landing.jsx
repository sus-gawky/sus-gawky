import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div>
    <Container id="landing-page" fluid className="py-3">
      <div style={{ zIndex: 2 }}>
        <h1>Welcome to Gawkysaur!</h1>
      </div>
      <div style={{ position: 'fixed', bottom: 30, zIndex: 1 }}>
        <Image className="translateGawkysaur" src="images/gawkysaurTurtleFancy.png" style={{ height: '30%', width: '30%', zIndex: -1 }} />
      </div>
      <Col>
        <Image src="images/backgroundTransparent.png" style={{ width: '100%', height: '100%', float: 'right' }} />
        <Row><Image src="https://w7.pngwing.com/pngs/892/738/png-transparent-cartoon-green-mountain-cartoon-decoration-angle-triangle-christmas-decoration.png" style={{ width: '50%', position: 'fixed', right: '0' }} /></Row>
        <Row>      <Image style={{ position: 'fixed', bottom: '-10' }} src="https://i.dlpng.com/static/png/6405906_preview.png" />
        </Row>
      </Col>
    </Container>
  </div>
);

export default Landing;
