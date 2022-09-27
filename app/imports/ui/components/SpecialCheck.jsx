import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const formSchema = new SimpleSchema({
  electricityBill: Number,
  waterBill: Number,
  donation: Number,
  volunteer: Number,
});
const bridge = new SimpleSchema2Bridge(formSchema);

// On submit, insert the data.
const submit = (data) => {
  // Will use these variables to calculate scores
  const { electricityBill, waterBill, donation, volunteer } = data;

  const owner = Meteor.user().username;
  Meteor.call('specialCheckIn', owner, electricityBill, waterBill, donation, volunteer);
};

const DailyCheck = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow} style={{ backgroundColor: '#257206FF', border: 'none' }} className="homeButtons">
        Special
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Special Check-in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="align-middle text-center">
            <Row>
              <h4>Monthly or Occasionally</h4>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col xs={3}>
                        <NumField name="electricityBill" decimal={null} />
                      </Col>
                      <Col xs={3}>
                        <NumField name="waterBill" decimal={null} />
                      </Col>
                      <Col xs={3}>
                        <NumField name="donation" decimal={null} />
                      </Col>
                      <Col xs={3}>
                        <NumField name="volunteer" decimal={null} />
                      </Col>
                    </Row>
                    <Row>
                      <SubmitField value="Submit" />
                    </Row>
                    <ErrorsField />
                  </Card.Body>
                </Card>
              </AutoForm>
            </Row>
            <p />
            <Row>
              <h4>Full Carbon Footprint</h4>
              <iframe title="carbonfootprint" width="710" height="500" frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no" src="https://calculator.carbonfootprint.com/calculator.aspx" />
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

// Require a document to be passed to this component.
export default DailyCheck;
