import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Columns } from 'react-bootstrap-icons';
import { Users } from '../../api/user/User';
import UnityFrame from '../components/UnityFrame';
import LoadingSpinner from '../components/LoadingSpinner';
import AddChallengeModal from '../components/AddChallengeModal';
import DailyCheck from '../components/DailyCheck';
import SpecialCheck from '../components/SpecialCheck';

/* A simple static component to render some text for the landing page. */
const UserProfile = () => {
  const { ready, currentUser } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    return {
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const mockData = ['pig', 'dog', 'cat'];

  return (ready ? (
    <div>
      <div id="landing-page" style={{ backgroundImage: 'url(\'../../images/background2.png\')' }}>
        <Container>
          <div className="fredoka-one pt-5">
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <div>
            {capitalizeFirstLetter(currentUser.city)}, {currentUser.zipCode}
          </div>
          <div>
            {currentUser.owner}
          </div>
          <div>
            Points: {currentUser.points}
          </div>
          {/* <div> */}
          {/*  {_.map(mockData, function (foo) { return foo; })} */}
          {/* </div> */}
        </Container>
      </div>
    </div>
  ) : <LoadingSpinner />);
};

export default UserProfile;
