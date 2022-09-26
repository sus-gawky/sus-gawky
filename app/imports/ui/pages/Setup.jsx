import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Users } from '../../api/user/User';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  zipCode: Number,
  householdSize: Number,
  carbonFootprintScore: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Setup page for adding a document. */
const Setup = () => {

  // On submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, zipCode, householdSize, carbonFootprintScore } = data;
    const owner = Meteor.user().username;
    Users.collection.insert(
      { fullScore: '-1', foodScore: '-1', transportationScore: '-1', miscScore: '-1', firstName, lastName, zipCode, householdSize, carbonFootprintScore, owner, specificInfos: [] },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile created successfully', 'success');
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Setup your profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" />
                <TextField name="lastName" />
                <NumField name="zipCode" decimal={null} />
                <NumField name="householdSize" decimal={null} />
                <NumField name="carbonFootprintScore" decimal={null} />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Setup;
