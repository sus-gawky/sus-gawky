import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const PurchaseModal = ({ desc, points }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="float-end" size="sm" onClick={handleShow}>Claim</Button>
      <Modal size="md" show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm your in-app purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to purchase {desc} for {points} points? </Modal.Body>
        <Modal.Footer>
          <Button size="md" variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button size="md" variant="success" onClick={handleClose}>
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
};

export default PurchaseModal;
