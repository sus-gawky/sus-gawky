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
  let nameDisplayed = `${from.firstName} ${from.lastName}`;
  nameDisplayed += ownMessage ? ' (you)' : '';
  const schema = new SimpleSchema({
    text: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);
  const submit = (doc, formRef) => {
    const { text } = doc;
    const createdAt = new Date();
    const comments = bulletin.comments;
    comments.push({ text: text, from: currentUser.owner, createdAt: createdAt });
    Bulletins.collection.update(
      { _id: bulletin._id },
      { $set: { comments } },
    );
    formRef.reset();
  };
  let fRef = null;
  return (
    (
      <div className="fredoka-one goals" style={{ width: '100%' }}>
        <div>
          <Row>
            <Col md="auto">
              <div className="mt-3 goalItems" style={{ textAlign: 'left', color: color }}>{nameDisplayed}</div>
            </Col>
            <Col>
              <div className="mt-3 goalItems" style={{ textAlign: 'left' }}> - posted {Functions.timeDisplay(bulletin.createdAt)}</div>
            </Col>
          </Row>
          <div className="title" style={{ textAlign: 'left', fontSize: 'xx-large' }}>{subject}</div>
          <div style={{ textAlign: 'left', paddingBottom: '10px', fontSize: 'large' }}>
            {message}
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Comments</Accordion.Header>
              <Accordion.Body style={{ padding: 0 }}>
                {bulletin.comments.sort(function (a, b) { return a.createdAt - b.createdAt; }).map((comment, index) => <Comment key={index} comment={comment} currentUser={currentUser} users={users} />)}
                <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                  <Row>
                    <Col xs={10}><LongTextField className="ms-2" name="text" label="" placeholder="Add a comment..." autoComplete="off" />
                    </Col>
                    <Col xs={2} style={{ padding: '0.5em 0em 1em 0em' }}><SubmitField style={{ textAlign: 'left', color: '#2AA404FF' }} /></Col>
                  </Row>

                </AutoForm>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <hr />
        </div>
      </div>
    ));
};

Bulletin.propTypes = {
  bulletin: PropTypes.objectOf.isRequired,
  currentUser: PropTypes.objectOf.isRequired,
  users: PropTypes.arrayOf.isRequired,
};

export default Bulletin;
