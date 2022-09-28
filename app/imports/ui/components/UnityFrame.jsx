import React from 'react';
import PropTypes from 'prop-types';

/** Renders a unity iframe */
const style = { overflow: 'hidden' };
const srcs = [0, 0, 0, 0, 'https://itch.io/embed-upload/6566421?color=e3f1d4'];
const hrefs = [0, 0, 0, 0, 'https://alyssiachen.itch.io/gawkysaur'];

const UnityFrame = ({ score }) => (
  <div style={style}>
    <iframe frameBorder="0" src={srcs[Math.ceil(score / 10 / 2) - 1]} allowFullScreen="" width="320em" height="320em" title="unity">
      <a href={hrefs[score]}>Play Pomegranate Baby on itch.io</a>
    </iframe>
  </div>
);

// Require a document to be passed to this component.
UnityFrame.propTypes = {
  score: PropTypes.number.isRequired,
};

export default UnityFrame;
