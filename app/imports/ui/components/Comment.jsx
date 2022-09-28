import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Functions from '../../api/functions/functions';

/** Displays messages and an addMessage field if readOnly = false */
const Comment = ({ comment, currentUser, users }) => {
  const from = users.filter(user => (user.owner === comment.from))[0];
  const ownComment = comment.from === currentUser.owner;
  const color = ownComment ? 'green' : 'black';
  const nameDisplayed = `${from.firstName} ${from.lastName}`;
  return (
    (
      <Card>
        <Row>
          <Col md="auto">
            <Card.Subtitle style={{ textAlign: 'left', color: color }}>{nameDisplayed}</Card.Subtitle>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'left' }}> - posted {Functions.timeDisplay(comment.createdAt)}</Card.Subtitle>
          </Col>
        </Row>
        <Row>
          {comment.text}
        </Row>
      </Card>
    ));
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

export default Comment;
