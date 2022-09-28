import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AutoForm, SubmitField, LongTextField } from 'uniforms-bootstrap5';
import Accordion from 'react-bootstrap/Accordion';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Bulletins } from '../../api/bulletin/Bulletin';
import Functions from '../../api/functions/functions';
import Comment from './Comment';

/** Displays messages and an addMessage field if readOnly = false */
const Bulletin = ({ bulletin, currentUser, users }) => {
  const subject = bulletin.subject;
  const message = bulletin.message;
  const from = users.filter(user => (user.owner === bulletin.from))[0];
  const ownMessage = bulletin.from === currentUser.owner;
  const color = ownMessage ? 'green' : 'black';
  const nameDisplayed = `${from.firstName} ${from.lastName}`;
  const schema = new SimpleSchema({
    text: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);
  const submit = (doc) => {
    const { text } = doc;
    const createdAt = new Date();
    const comments = bulletin.comments;
    comments.push({ text: text, from: currentUser.owner, createdAt: createdAt });
    console.log(comments);
    Bulletins.collection.update(
      { _id: bulletin._id },
      { $set: { comments } },
    );
  };
  return (
    (
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Row>
            <Col md="auto">
              <Card.Subtitle style={{ textAlign: 'left', color: color }}>{nameDisplayed}</Card.Subtitle>
            </Col>
            <Col>
              <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'left' }}> - posted {Functions.timeDisplay(bulletin.createdAt)}</Card.Subtitle>
            </Col>
          </Row>
          <Card.Title style={{ textAlign: 'left' }}>{subject}</Card.Title>
          <Card.Text style={{ textAlign: 'left' }}>
            {message}
          </Card.Text>
          <Accordion style={{ paddingLeft: 0 }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Comments</Accordion.Header>
              <Accordion.Body>
                {bulletin.comments.map((comment, index) => <Comment key={index} comment={comment} currentUser={currentUser} users={users} />)}
                <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                  <LongTextField name="text" label="" placeholder="Add a comment..." autoComplete="off" />
                  <SubmitField />
                </AutoForm>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
