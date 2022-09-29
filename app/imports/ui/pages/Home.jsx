import React from 'react';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import ProgressBar from 'react-bootstrap/ProgressBar';
import AddChallengeModal from '../components/AddChallengeModal';
import DailyCheck from '../components/DailyCheck';
import SpecialCheck from '../components/SpecialCheck';
import { Users } from '../../api/user/User';
import { Tips } from '../../api/tip/Tips';
import LoadingSpinner from '../components/LoadingSpinner';
import UnityFrame from '../components/UnityFrame';
import HomeLeaderBoard from '../components/HomeLeaderBoard';
import { Challenges } from '../../api/challenge/Challenge';
import Functions from '../../api/functions/functions';
import TipSubmission from '../components/TipSubmission';

const Home = () => {
  const { ready, currentUser, lvlInfo, challengesUser, tip, tipPerson } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const userName = Meteor.user();
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    const subscriptionChal = Meteor.subscribe(Challenges.userPublicationName);
    const subscriptionTips = Meteor.subscribe(Tips.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscriptionChal.ready() && subscriptionTips.ready();
    // Get the Stuff documents
    const ownerItem = userName ? userName.username : 'hi';
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userName ? userItems.filter((user) => (user.owner === ownerItem))[0] : '';
    // Users.collection.find({ signUpList });
    const allTips = Tips.collection.find({}).fetch();
    const randomNum = Math.floor(Math.random() * (allTips.length - 0 + 1) + 0);
    const aTip = allTips.length !== 0 ? allTips[randomNum].tip : 'Always be kind to the Earth.';
    const tipWriter = allTips.length !== 0 ? allTips[randomNum].name : 'Mom';
    const foundChallenges = userName ? Challenges.collection.find(
      { signUpList: userName.username },
    ).fetch() : 'hi';
    const lvlInfoItem = rdy ? Functions.getLvlInfo(currentUserItem) : null;
    return {
      lvlInfo: lvlInfoItem,
      users: userItems,
      owner: ownerItem,
      currentUser: currentUserItem,
      ready: rdy,
      challengesUser: foundChallenges,
      tip: aTip,
      tipPerson: tipWriter,
    };
  }, []);
  const handleCheckGoals = (e, indexSelected) => {
    const { checked } = e.target;
    if (checked) {
      Meteor.call('leaveChallenge', challengesUser[indexSelected]._id, currentUser.owner, true, challengesUser[indexSelected].points);
    }
  };
  // const [modal, setModal] = useState(false);
  const createFakeGoals = () => {

    console.log(`challengesUser: ${JSON.stringify(challengesUser)}`);
    const challenges = [];

    for (const challengeObject of challengesUser) {
      const dateObj = new Date(challengeObject.endDate);
      const month = dateObj.getMonth() + 1; // months from 1-12
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();
      const newdate = `${month}/${day}/${year}`;

      challenges.push({ goal: `${challengeObject.challenge} : ${challengeObject.description} | ${challengeObject.signUpList.length} people signed up | ${newdate}` });
    }
    return challenges;
  };
  return (ready ? (
    <Container>
      <Row className="fredoka-one" style={{ margin: '0.5em' }}>
        <Col className="d-flex justify-content-center">Welcome, {currentUser.firstName} {currentUser.lastName}</Col>
      </Row>
      <Row>
        <Col xs={1}>
          <h4 className="fredoka-one goals">Level {lvlInfo.level}</h4>
        </Col>
        <Col xs={11}>
          <ProgressBar className="mt-2" variant="success" now={lvlInfo.progress} label={`${lvlInfo.progress}%`} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={8} className="d-flex justify-content-center">
          <div className="fredoka-one goals" style={{ background: 'rgb(227, 241, 212, 0.5)', marginTop: '0px', width: '100%', padding: '0.5em', borderRadius: '20px' }}>
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
                  onClick={(e) => { handleCheckGoals(e, index); }}
                  label={data.goal}
                />
              </motion.div>
            ))}
          </div>
        </Col>
        <Col xs={4} className="d-flex justify-content-center" style={{ paddingRight: '1em' }}>
          <HomeLeaderBoard />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <UnityFrame score={currentUser.fullScore} givenWidth="640em" givenHeight="300em" />
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
              <Row>
                <Col xs={1} />
                <Col xs={8}>
                  <h2>&quot;{tip}&quot; - {tipPerson}</h2>
                </Col>
                <Col xs={2}>
                  <TipSubmission tipSubmitter={currentUser.firstName} />
                </Col>
                <Col xs={1} />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Home;
