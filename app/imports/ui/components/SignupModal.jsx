import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Accounts } from 'meteor/accounts-base';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';
import PropTypes from 'prop-types';
import SignUp from '../pages/SignUp';

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
    console.log('works');
    const { email, password, firstName, lastName, zipCode, householdSize, city } = doc;

    console.log(typeof password);
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        const owner = Meteor.user().username;
        Users.collection.insert(
          { fullScore: '-1', foodScore: '-1', transportationScore: '-1', miscScore: '-1', firstName, lastName, zipCode, householdSize, city, owner, specificInfos: [] },
          (badUser) => {
            if (badUser) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Profile created successfully', 'success');
            }
          },
        );
        setError('');
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
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <TextField name="firstName" />
            <TextField name="lastName" />
            <TextField name="city" />
            <NumField name="zipCode" decimal={null} />
            <NumField name="householdSize" decimal={null} />
            <TextField name="email" placeholder="E-mail address" />
            <TextField name="password" placeholder="Password" type="password" />
            <ErrorsField />
            <Button className="float-end" onClick={submit} />
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
