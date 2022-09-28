import React from 'react';
import { Button, Carousel, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import AddChallengeModal from '../components/AddChallengeModal';
import DailyCheck from '../components/DailyCheck';
import SpecialCheck from '../components/SpecialCheck';
import { Users } from '../../api/user/User';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { ready, currentUser, owner, users } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    console.log(Meteor.user().username);
    const ownerItem = Meteor.user().username;
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === ownerItem))[0];
    return {
      users: userItems,
      owner: ownerItem,
      currentUser: currentUserItem,
      ready: rdy,
    };
  }, []);
  // const [modal, setModal] = useState(false);
  const createFakeGoals = () => {
    const fakeGoals = [];
    for (let i = 0; i < 5; i++) {
      fakeGoals.push({
        goal: `Fake goal ${i + 1}`,
        finished: false,
      });
    }
    return fakeGoals;
  };
  return (ready ? (
    <Container style={{ backgroundColor: '#F5F5F5' }}>
      <Row className="fredoka-one">
        <Col className="d-flex justify-content-center">Welcome, {currentUser.firstName} {currentUser.lastName}</Col>
        <h1>Points: {currentUser.points}</h1>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <Form>
            <>
              <div className="fredoka-one goals mt-5">
                Challenges
                <AddChallengeModal />
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
          <Nav.Link as={NavLink} to="/challenges" className="homeButtons">
            <Button style={{ backgroundColor: '#60E831FF', border: 'none', width: '100%', height: '100%' }}>Challenges</Button>
          </Nav.Link>
        </Col>
        <Col className="d-flex justify-content-center">
          <DailyCheck />
        </Col>
        <Col className="d-flex justify-content-center">
          <SpecialCheck />
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
  ) : <LoadingSpinner />);
};

export default Home;
