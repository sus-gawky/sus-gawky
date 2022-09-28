import React from 'react';
import PropTypes from 'prop-types';

/** Renders a unity iframe */
const style = { overflow: 'hidden', borderRadius: '1%' };
const srcs = [0, 0, 0, 0, 'https://itch.io/embed-upload/6567956?color=e3f1d4'];
const hrefs = [0, 0, 0, 0, 'https://alyssiachen.itch.io/gawkysaur-widthlong-10'];

const UnityFrame = ({ score, givenWidth = '320', givenHeight = '320' }) => (
  <div style={style}>
    <iframe frameBorder="0" src={srcs[Math.ceil(score / 10 / 2) - 1]} allowFullScreen="" width={givenWidth} height={givenHeight} title="unity">
      <a href={hrefs[score]}>Play Pomegranate Baby on itch.io</a>
    </iframe>
  </div>
);

// Require a document to be passed to this component.
UnityFrame.propTypes = {
  score: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  givenWidth: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  givenHeight: PropTypes.string,
};

export default UnityFrame;
