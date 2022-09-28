import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Bulletins } from '../../api/bulletin/Bulletin';
import { Users } from '../../api/user/User';
import Bulletin from './Bulletin';
import LoadingSpinner from './LoadingSpinner';

/** Displays messages and an addMessage field if readOnly = false */
const BulletinBoard = () => {
  const { ready, bulletins, currentUser, users } = useTracker(() => {
    const subscription1 = Meteor.subscribe(Bulletins.userPublicationName);
    const subscription2 = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready();
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    const bulletinItems = Bulletins.collection.find({ zipCode: currentUserItem.zipCode }).fetch();
    return {
      bulletins: bulletinItems,
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const schema = new SimpleSchema({
    subject: String,
    message: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);
  const submit = (doc) => {
    handleClose();
    const { subject, message } = doc;
    const from = currentUser.owner;
    const createdAt = new Date();
    const zipCode = currentUser.zipCode;
    const comments = [];
    Bulletins.collection.insert({ subject, message, from, createdAt, zipCode, comments });
  };
  return (ready ? (
    <Container style={{ padding: 0 }}>
      <div style={{ height: '100%', width: '100%' }}>
        {bulletins.reverse().map((bulletin, index) => <Bulletin key={index} bulletin={bulletin} users={users} currentUser={currentUser} />)}
      </div>
      <>
        <Button variant="primary" onClick={handleShow}>
          Create Post
        </Button>

        <Modal show={show} onHide={handleClose}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Header closeButton>
                <Card.Title>Create a post</Card.Title>
              </Card.Header>
              <Card.Body>
                <TextField name="subject" placeholder="What do you want to talk about?" autoComplete="off" />
                <TextField name="message" placeholder="Elaborate here..." autoComplete="off" />
                <ErrorsField />
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col style={{ textAlign: 'left' }}>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Col>
                  <Col style={{ textAlign: 'right' }}>
                    <SubmitField />
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </AutoForm>
        </Modal>
      </>
    </Container>
  ) : <LoadingSpinner />);
};

export default BulletinBoard;
