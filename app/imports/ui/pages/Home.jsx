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
import UnityFrame from '../components/UnityFrame';

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
        goal: `This is fake goal ${i + 1}    |    09/21/22    |    22 challengers`,
        finished: false,
      });
    }
    return fakeGoals;
  };
  return (ready ? (
    <Container>
      <Row className="fredoka-one" style={{ margin: '0.5em' }}>
        <Col className="d-flex justify-content-center">Welcome, {currentUser.firstName} {currentUser.lastName}</Col>
      </Row>
      <Row className="mt-4">
        <Col xs={8} className="d-flex justify-content-center">
          <div className="fredoka-one goals" style={{ background: 'rgb(227, 241, 212, 0.5)', marginTop: '0px', width: '100%', padding: '0.5em' }}>
            <h2>Challenges<span style={{ float: 'right' }}><AddChallengeModal /></span></h2>

            {createFakeGoals().map((data, index) => (
              <motion.div
                className="mt-3 goalItems"
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
          </div>
        </Col>
        <Col className="d-flex justify-content-center" style={{ paddingRight: '1em' }}>
          <UnityFrame score={100} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
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
        <Col>
          <Row style={{ height: '50%', marginTop: '3em' }}>
            <Col className="d-flex justify-content-center" xs={4}>
              <Nav.Link as={NavLink} to="/challenges" style={{ width: '100%' }} className="d-flex justify-content-center">
                <Button className="homeButtons" style={{ backgroundColor: '#60E831FF', border: 'none' }}>Challenges</Button>
              </Nav.Link>
            </Col>
            <Col className="d-flex justify-content-center" xs={4}>
              <DailyCheck />
            </Col>
            <Col className="d-flex justify-content-center" xs={4}>
              <SpecialCheck />
            </Col>
          </Row>
          <Row style={{ height: '50%' }}>
            <Col className="d-flex justify-content-center">
              <h2>"Tip of the day" - Albert Einstein</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Home;
