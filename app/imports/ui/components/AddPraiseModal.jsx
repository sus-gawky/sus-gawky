import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Meteor } from 'meteor/meteor';
import { Card } from 'react-bootstrap';
import {
  AutoForm, DateField,
  ErrorsField, LongTextField, NumField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Challenges } from '../../api/challenge/Challenge';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const formSchema = new SimpleSchema({
  challenge: String,
  endDate: String,
  description: String,
  points: String,
  tags: {
    type: String,
    allowedValues: ['Food', 'Shopping', 'Transportation'],
    defaultValue: 'Food',
  },
});
const bridge = new SimpleSchema2Bridge(formSchema);

const AddChallengeModal = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // On submit, insert the data.
  const submit = (data) => {
    // Will use these variables to calculate scores
    // eslint-disable-next-line no-unused-vars
    const { challenge, endDate, description, points, tags } = data;
    const owner = Meteor.user().username;
    const signUpList = [];
    Challenges.collection.insert(
      { challenge, endDate, description, points, tags, owner, signUpList },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          setShow(false);
        }
      },
    );
  };
  return (
    <>
      <Button variant="success" className="mx-3 w-100" onClick={handleShow}>
        <h5>Add Praise
        </h5>
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create Your Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="challenge" />
                <SelectField name="tags" />
                <DateField
                  name="endDate"
                />
                <LongTextField name="description" />
                <NumField name="points" />
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
export default AddChallengeModal;
