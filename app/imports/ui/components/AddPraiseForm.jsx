import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { Praise } from '../../api/praise/Praise';

const AddPraiseForm = () => {
  const [praiseType, setPraiseType] = useState('Food');
  const [comment, setComment] = useState('');
  const reset = () => {
    setPraiseType('');
    setComment('');
  };
  const submit = (e) => {
    e.preventDefault();
    const emojiCounter = {};
    const category = praiseType;
    const dateCreated = new Date();
    Praise.collection.insert(
      { comment, category, emojiCounter, dateCreated },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Praise added successfully', 'success');
          reset();
        }
      },
    );
  };
  return (
    <Card className="mw-100 h-25">
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Praise Type</Form.Label>
            <Form.Select value={praiseType} onChange={(e) => (setPraiseType(e.target.value))}>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control value={comment} onChange={(e) => (setComment(e.target.value))} as="textarea" rows={3} placeholder="Write your praise comment" />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100" onClick={submit}>
            <h5>Add Praise</h5>
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
export default AddPraiseForm;
