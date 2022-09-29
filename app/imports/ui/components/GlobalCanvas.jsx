import React from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import PropTypes from 'prop-types';

const GlobalCanvas = ({ show, onHide, scoreInformation }) => (
  <Offcanvas show={show} onHide={() => (onHide(false))} placement="end" name="end" backdrop={false}>
    <Offcanvas.Header closeButton className="center">
      <Offcanvas.Title>Average Sustainability Scores For {scoreInformation.city}</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <ListGroup>
        <ListGroup.Item>Full Score: {scoreInformation.fullScore.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>Misc Score: {scoreInformation.miscScore.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>Transportation score: {scoreInformation.transportationScore.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>Food score: {scoreInformation.foodScore.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>Points: {scoreInformation.points.toFixed(2)}</ListGroup.Item>
      </ListGroup>
    </Offcanvas.Body>
  </Offcanvas>
);

GlobalCanvas.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  scoreInformation: PropTypes.shape({
    miscScore: PropTypes.number.isRequired,
    transportationScore: PropTypes.number.isRequired,
    fullScore: PropTypes.number.isRequired,
    foodScore: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default GlobalCanvas;
