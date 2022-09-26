import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Home = () => {
  const [modal, setModal] = useState(false);
  const createFakeGoals = () => {
    const fakeGoals = [];
    for (let i = 0; i < 3; i++) {
      fakeGoals.push({
        goal: `Fake goal ${i}`,
        finished: false,
      });
    }
    return fakeGoals;
  };
  return (
    <Container className="justify-content-center w-100">
      <Row className="fredoka-one">
        <Col>Welcome, Gavin Peng</Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form>
            <>
              <div className="fredoka-one goals">
                Goals
                <Button className="mx-3" size="sm" onClick={() => (setModal(true))}>Add Goal</Button>
              </div>
              {createFakeGoals().map((data, index) => (
                <motion.div
                  className="mt-3"
                  key={index}
                  initial={{
                    opacity: 0,
                    translateX: -50,
                    translateY: -50,
                  }}
                  animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Form.Check
                    type="checkbox"
                    id="default-i"
                    label={data.goal}
                  />
                </motion.div>
              ))}
            </>
          </Form>
        </Col>
        <Col>
          <div className="home-picture" />
        </Col>
      </Row>
      <Row className="mt-3">
        {/* TODO: Make this a list */}
        <Col>List</Col>
      </Row>
      <Row className="mt-3">
        {/* TODO: Make this a carousel */}
        <Col><div className="score-card" /></Col>
        <Col>
          <div>
            Tip of the day
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
