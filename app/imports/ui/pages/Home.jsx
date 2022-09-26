import React, { useState } from 'react';
import { Button, Carousel, Col, Container, Form, Row } from 'react-bootstrap';
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
    <Container style={{ backgroundColor: '#F5F5F5' }}>
      <Row className="fredoka-one">
        <Col className="d-flex justify-content-center">Welcome, Gavin Peng</Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <Form>
            <>
              <div className="fredoka-one goals mt-5">
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
        <Col className="d-flex justify-content-center">
          <div className="home-picture" />
        </Col>
      </Row>
      <Row className="mt-5">
        {/* TODO: Make this have a dotted line connecting the buttons */}
        <Col className="d-flex justify-content-center">
          <Button style={{ backgroundColor: '#60E831FF', border: 'none' }}>Button 1</Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button style={{ backgroundColor: '#2AA404FF', border: 'none' }}>Button 2</Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button style={{ backgroundColor: '#257206FF', border: 'none' }}>Button 3</Button>
        </Col>
      </Row>
      <Row className="mt-5 mb-3">
        <Col className="d-flex justify-content-center mx-5">
          <div className="score-card">
            <Carousel>
              <Carousel.Item interval={1500}>
                <div className="score-card">
                  Green card one
                </div>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <div className="score-card">
                  Green card two
                </div>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <div className="score-card">
                  Green card three
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
        <Col className="d-flex justify-content-center mt-5">
          <div>
            Some motivational speech
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default Home;
