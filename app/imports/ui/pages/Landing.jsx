import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id="landing-page" style={{ backgroundImage: `url('../../images/background.png')` }}>
    <div style={{ float: 'right', paddingRight: '5em' }}>
      <h1>Welcome to Gawkysaur!</h1>
    </div>
    <div style={{ position: 'fixed', bottom: 30, zIndex: 2 }}>
      <Image className="translateGawkysaur" src="images/gawkysaurTurtleFancy.png" style={{ height: '20%', width: '20%' }} />
    </div>
    {/*<Col>*/}
    {/*  <Image src="images/background.png" style={{ width: '100%', height: '50%', float: 'right' }} />*/}
    {/*</Col>*/}
  </div>
);

export default Landing;
