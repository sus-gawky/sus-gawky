import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const OwnedPrize = ({ prize }) => (
  <Card style={{ width: '10px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
    <Card.Img variant="top" src="../images/bulba.png" />
    <Card.Text className="text-center fredoka-one goals">
      Bulbasaur Pet
    </Card.Text>
    <Card.Footer>
      <small className="text-muted">600 points</small>
      <Button className="float-end" size="sm">Claim</Button>
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
OwnedPrize.propTypes = {
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

export default OwnedPrize;
