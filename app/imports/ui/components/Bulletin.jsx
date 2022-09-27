import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

/** Displays messages and an addMessage field if readOnly = false */
const Bulletin = ({ bulletin, currentUser, users }) => {
  const subject = bulletin.subject
  const message = bulletin.message;
  const from = users.filter(user => (user.owner === bulletin.from));
  const ownMessage = bulletin.from === currentUser.owner;
  const position = ownMessage ? 'right' : 'left';
  const color = ownMessage ? 'green' : 'teal';
  const nameDisplayed = `${from[0].firstName} ${from[0].lastName}`;
  return (
    (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'left' }}>{subject}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'left' }}>{bulletin.createdAt.toLocaleDateString('en-US')}</Card.Subtitle>
          <Card.Text style={{ textAlign: 'left' }}>
            {message}
          </Card.Text>
          <Card.Text style={{ textAlign: 'right' }}>
            -{nameDisplayed}
          </Card.Text>
        </Card.Body>
      </Card>
    ));
};

Bulletin.propTypes = {
  bulletin: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

export default Bulletin;
