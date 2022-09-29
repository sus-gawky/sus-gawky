import React from 'react';
import PropTypes from 'prop-types';

/** Renders a unity iframe */
const style = { overflow: 'hidden', borderRadius: '1%' };
const srcs = ['https://itch.io/embed-upload/6573269?color=e3f1d4', 'https://itch.io/embed-upload/6573269?color=e3f1d4', 'https://itch.io/embed-upload/6573303?color=e3f1d4', 'https://itch.io/embed-upload/6573310?color=e3f1d4', 'https://itch.io/embed-upload/6567956?color=e3f1d4'];
const hrefs = ['https://alyssiachen.itch.io/gawkysaur-level1', 'https://alyssiachen.itch.io/gawkysaur-level1', 'https://alyssiachen.itch.io/gawkysaur-level5', 'https://alyssiachen.itch.io/gawkysaur-level', 'https://alyssiachen.itch.io/gawkysaur-widthlong-10'];

const mapScenes = (theScore) => {
  console.log(theScore)
  let sceneIndex = 0;
  if (theScore > 90) {
    sceneIndex = 4;
  } else if (theScore > 80) {
    sceneIndex = 3;
  } else if (theScore > 60) {
    sceneIndex = 2;
  } else if (theScore > 30) {
    sceneIndex = 1;
  } else {
    sceneIndex = 0;
  }
  console.log("sceneIndex" + sceneIndex);
  return sceneIndex;

};

const UnityFrame = ({ score, givenWidth = '320', givenHeight = '320' }) => (
  <div style={style}>
    <iframe frameBorder="0" src={srcs[mapScenes(score)]} allowFullScreen="" width={givenWidth} height={givenHeight} title="unity">
      <a href={hrefs[mapScenes(score)]}>Play Pomegranate Baby on itch.io</a>
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
