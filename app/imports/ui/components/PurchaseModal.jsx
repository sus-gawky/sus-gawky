import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';

const PurchaseModal = ({ desc, points, user }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newPoints = user.points - points;
  const submit = () => {
    if (newPoints < 0) {
      console.log('Youre too broke for this');
      handleClose();
    } else {
      Users.collection.update(
        { _id: user._id },
        { $set: { points: newPoints } },
        (err) => { console.log(err); },
      );
    }
    handleClose();
  };
  const pointCheck = () => {
    if (newPoints < 0) {
      swal('Error', 'Not enough points', 'error');
    } else {
      handleShow();
    }
  };

  return (
    <div>
      <Button className="float-end" size="sm" onClick={pointCheck}>Claim</Button>
      <Modal size="md" show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm your in-app purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to purchase {desc} for {points} points? </Modal.Body>
        <Modal.Footer>
          <Button size="md" variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button size="md" variant="success" onClick={submit}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

PurchaseModal.propTypes = {
  desc: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default PurchaseModal;
