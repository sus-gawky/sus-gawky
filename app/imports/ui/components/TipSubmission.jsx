import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Meteor } from 'meteor/meteor';
import { Card } from 'react-bootstrap';
import { AutoField, AutoForm, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Tips } from '../../api/tip/Tips';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const formSchema = new SimpleSchema({
  tip: String,
});
const bridge = new SimpleSchema2Bridge(formSchema);

// On submit, insert the data.
const submit = (data) => {
  // Will use these variables to calculate scores
  // eslint-disable-next-line no-unused-vars
  const { tip } = data;
  const id = 9;

  Tips.collection.insert(
    { tip, id },
    (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Your tip has been recorded successfully', 'success');
      }
    },
  );
};

const TipSubmission = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow} style={{ backgroundColor: '#2AA404FF', border: 'none' }} className="homeButtons">
        Tip Submission
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Tip Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <h4>Enter a tip suggestion: </h4>
                <AutoField name="tip" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

// Require a document to be passed to this component.
export default TipSubmission;
