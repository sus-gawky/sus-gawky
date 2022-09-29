import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Accounts } from 'meteor/accounts-base';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';

const SignupModal = () => {
  const [show, setShow] = useState(false);
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [error, setError] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    city: String,
    zipCode: Number,
    householdSize: Number,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password, firstName, lastName, zipCode, householdSize, city } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        const owner = Meteor.user().username;
        Users.collection.insert(
          { fullScore: '0', foodScore: '0', transportationScore: '0', swag: [], xp: 0, points: 0, miscScore: '0', firstName, lastName, zipCode, householdSize, city, owner, specificInfos: [] },
          (badUser) => {
            if (badUser) {
              swal('Error', badUser.message, 'error');
            } else {
              swal('Success', 'Profile created successfully', 'success');
            }
          },
        );
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // eslint-disable-next-line no-restricted-globals
  const { from } = location?.state || { from: { pathname: '/homepage' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <div className="float-start ms-3">
      <Button onClick={handleShow}>Create New Account</Button>
      <Modal size="md" show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="fredoka-one">Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm className="fredoka-one goals" schema={bridge} onSubmit={data => submit(data)}>
            <TextField name="firstName" />
            <TextField name="lastName" />
            <TextField name="city" />
            <NumField name="zipCode" decimal={null} />
            <NumField name="householdSize" decimal={null} />
            <TextField name="email" placeholder="E-mail address" />
            <TextField name="password" placeholder="Password" type="password" />
            <ErrorsField />
            <SubmitField className="float-end" />
            <Button className="float-end me-3" size="md" variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </AutoForm>
        </Modal.Body>
      </Modal>
    </div>
  );
};

SignupModal.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignupModal.defaultProps = {
  location: { state: '' },
};

export default SignupModal;
