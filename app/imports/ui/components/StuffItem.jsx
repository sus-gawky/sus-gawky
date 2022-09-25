import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StuffItem = ({ goal }) => (
  <tr>
    <td>{goal.goal}</td>
    <td>{goal.description}</td>
    <td>{goal.signUpList}</td>
    <td>
      <Link to={`/edit/${goal._id}`}>Sign Up</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
StuffItem.propTypes = {
  goal: PropTypes.shape({
    goal: PropTypes.string,
    description: PropTypes.string,
    signUpList: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StuffItem;
