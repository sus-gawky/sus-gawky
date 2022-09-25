import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const GoalItem = ({ goal }) => (
  <tr>
    <td>{goal.goal}</td>
    <td>{goal.description}</td>
    <td>{goal.tags}</td>
    <td>{goal.endDate}</td>
    <td>{goal.points}</td>
    <td>{goal.signUpList}</td>
    <td>
      <Link to={`/edit/${goal._id}`}>Sign Up</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
GoalItem.propTypes = {
  goal: PropTypes.shape({
    goal: PropTypes.string,
    description: PropTypes.string,
    signUpList: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    endDate: PropTypes.string,
    points: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default GoalItem;
