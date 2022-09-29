import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Meteor } from 'meteor/meteor';
import { Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const formSchema = new SimpleSchema({
  foodWasted: Number,
  minutesShowering: Number,
  mainProteinType: {
    type: String,
    allowedValues: ['Beef', 'Pork', 'Poultry', 'Eggs', 'Fish', 'Vegetarian'],
    defaultValue: 'Beef',
  },
  milesTraveled: Number,
  modeOfTransport: {
    type: String,
    allowedValues: ['Gas Vehicle', 'Bus', 'Bike/Walk', 'Electric Vehicle'],
    defaultValue: 'Gas Vehicle',
  },
  plasticTrash: Number,
});
const bridge = new SimpleSchema2Bridge(formSchema);

const calcFoodScore = (foodWaste, minShower, mainProtein) => {
  let points = 34;
  points -= Math.ceil(foodWaste / 2);
  points -= Math.ceil(minShower / 5);
  switch (mainProtein) {
  case 'Beef':
    points -= 20;
    break;
  case 'Pork':
    points -= 10;
    break;
  case 'Poultry':
    points -= 5;
    break;
  case 'Eggs':
    points -= 5;
    break;
  case 'Fish':
    points -= 5;
    break;
  default:
    console.log('vegetarian');
  }
  return points < 0 ? 0 : points;
};

const calcTransportationScore = (milesTraveled, modeOfTransport) => {
  let points = 33;
  points -= Math.ceil(milesTraveled / 2);
  switch (modeOfTransport) {
  case 'Gas Vehicle':
    points -= 20;
    break;
  case 'Bus':
    points -= 10;
    break;
  case 'Electric Vehicle':
    points -= 3;
    break;
  default:
    console.log('Bike/Walk');
  }

  return points < 0 ? 0 : points;
};

const calcMiscScore = (plasticTrash) => {
  let points = 33;
  points -= Math.ceil(plasticTrash / 2);
  return points < 0 ? 0 : points;
};

const DailyCheck = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // On submit, insert the data.
  const submit = (data) => {
    // Will use these variables to calculate scores
    // eslint-disable-next-line no-unused-vars
    const { foodWasted, minutesShowering, mainProteinType, milesTraveled, modeOfTransport, plasticTrash } = data;
    const owner = Meteor.user().username;

    const foodScore = calcFoodScore(foodWasted, minutesShowering, mainProteinType);
    const transportationScore = calcTransportationScore(milesTraveled, modeOfTransport);
    const miscScore = calcMiscScore(plasticTrash);
    const fullScore = foodScore + transportationScore + miscScore;
    Meteor.call('dailyCheckIn', owner, fullScore, foodScore, transportationScore, miscScore);
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow} style={{ backgroundColor: '#2AA404FF', border: 'none' }} className="homeButtons">
        Daily
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Daily Check-in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <h4>Food + Water</h4>
                <NumField name="foodWasted" decimal={null} />
                <NumField name="minutesShowering" decimal={null} />
                <SelectField name="mainProteinType" />
                <h4>Transportation</h4>

                <NumField name="milesTraveled" decimal={null} />
                <SelectField name="modeOfTransport" />
                <h4>Miscellaneous</h4>

                <NumField name="plasticTrash" decimal={null} />
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
export default DailyCheck;
