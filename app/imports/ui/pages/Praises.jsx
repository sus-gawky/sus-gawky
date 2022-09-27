import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Praise } from '../../api/praise/Praise';
import AddPraiseModal from '../components/AddPraiseModal';

/* Renders the Praises page for adding a document. */
const Praises = () => {
  const [praiseType, setPraiseType] = useState('Praise Type');
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Praise.collection.insert(
      { name, quantity, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Praises</h2></Col>
          <Col className="d-flex justify-content-center">
            <AddPraiseModal />
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Praises;
