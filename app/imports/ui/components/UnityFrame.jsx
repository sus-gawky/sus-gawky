import React from 'react';
import PropTypes from 'prop-types';

/** Renders a unity iframe */
const style = { 'border-radius': '20px', overflow: 'hidden' };
const srcs = ['https://itch.io/embed-upload/6186209?color=577139'];
const hrefs = ['https://alyssiachen.itch.io/pomegranate-baby'];

const UnityFrame = ({ score }) => (
  <div style={style}>
    <iframe frameBorder="0.1" src={srcs[score]} allowFullScreen="" width="100%" height="280" title="unity">
      <a href={hrefs[score]}>Play Pomegranate Baby on itch.io</a>
    </iframe>
  </div>
);

// Require a document to be passed to this component.
UnityFrame.propTypes = {
  score: PropTypes.number.isRequired,
};

export default UnityFrame;
