import React from 'react';
import { Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div className="d-flex justify-content-center fredoka-one" id="landing-page" style={{ backgroundImage: 'url(\'../../images/background.png\')' }}>
    <div style={{ float: 'right', paddingRight: '5em', paddingTop: '4em', fontSize: 'xx-large' }}>
      <h1>Welcome to Gawkysaur!</h1>
    </div>
    <div style={{ position: 'fixed', bottom: 30, zIndex: 2 }}>
      <Image className="translateGawkysaur" src="images/gawkysaurTurtleFancy.png" style={{ height: '20%', width: '20%' }} />
    </div>
  </div>
);

export default Landing;
