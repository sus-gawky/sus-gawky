import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const ChallengeItem = ({ challenge }) => (
  <tr>
    <td>
      {challenge.challenge}<br />
      {challenge.owner === Meteor.users.findOne(Meteor.userId).username && <Link to={`/edit/${challenge._id}`}>Edit Challenge</Link>}
    </td>
    <td>{challenge.description}</td>
    <td>{challenge.tags.join(' ')}</td>
    <td>{challenge.endDate}</td>
    <td>{challenge.points}</td>
    <td>{challenge.signUpList.length}</td>
    <td>
      {challenge.signUpList.includes(Meteor.user().username) ?
        <Button onClick={() => Meteor.call('leaveChallenge', challenge._id, Meteor.user().username, challenge.owner)}>Leave</Button>
        : <Button onClick={() => Meteor.call('updateChallenge', challenge._id, Meteor.user().username)}>Sign Up</Button>}
    </td>
  </tr>
);

// Require a document to be passed to this component.
ChallengeItem.propTypes = {
  challenge: PropTypes.shape({
    challenge: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    signUpList: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    endDate: PropTypes.string,
    points: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ChallengeItem;