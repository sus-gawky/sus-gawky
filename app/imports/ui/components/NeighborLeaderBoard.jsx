import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Carousel } from 'react-bootstrap';
import { EmojiAngry, EmojiNeutral, EmojiSmile, Trophy } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import LoadingSpinner from './LoadingSpinner';
import Function from '../../api/functions/functions';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const NeighborLeaderBoard = () => {
  const { ready, users, currentUser } = useTracker(() => {
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
  // eslint-disable-next-line consistent-return
  const scoreSelector = (score) => {
    if (score <= 30 && score > 0) {
      return (<EmojiAngry className="float-end" />);
    }
    if (score <= 60 && score > 30) {
      return (<EmojiNeutral className="float-end" />);
    }
    if (score <= 100 && score > 60) {
      return (<EmojiSmile className="float-end" />);
    }
  };
  // eslint-disable-next-line consistent-return
  const emojiBasedOnscore = (leaderBoardScore) => {
    const transportationSScore = currentUser.transportationScore;
    const fullScore = currentUser.fullScore;
    const foodScore = currentUser.foodScore;
    if (leaderBoardScore === 'Total Score') {
      return scoreSelector(fullScore);
    }
    if (leaderBoardScore === 'Food Score') {
      return scoreSelector(foodScore);
    }
    if (leaderBoardScore === 'Travel Score') {
      return scoreSelector(transportationSScore);
    }
  };
  return (ready ? (
    <Carousel id="neighbor-leader-carousel" className="ms-2" variant="dark" style={{ width: '45.5em' }}>
      <Carousel.Item className="leader-body">
        <div className="leaderboard">
          <h1>
            <Trophy fill="#B2D2A4" />
            <span> Total Score </span>
            {emojiBasedOnscore('Total Score')}
          </h1>
          <ul>
            <li>
              <mark>You</mark>
              <small>{currentUser.fullScore}</small>
            </li>
          </ul>
          <ol>
            {Function.topTotalScores(users.filter(user => (user.city === currentUser.city))).map((user, index) => <li key={index}><mark>{`${user.firstName} ${user.lastName}`}</mark><small>{user.fullScore}</small></li>)}
          </ol>
        </div>
      </Carousel.Item>
      <Carousel.Item className="leader-body">
        <div className="leaderboard">
          <h1>
            <Trophy fill="#B2D2A4" />
            Food Score
            {emojiBasedOnscore('Food Score')}
          </h1>
          <ul>
            <li>
              <mark>You</mark>
              <small>{currentUser.foodScore}</small>
            </li>
          </ul>
          <ol>
            {Function.topFoodScores(users.filter(user => (user.city === currentUser.city))).map((user, index) => <li key={index}><mark>{`${user.firstName} ${user.lastName}`}</mark><small>{user.foodScore}</small></li>)}
          </ol>
        </div>
      </Carousel.Item>
      <Carousel.Item className="leader-body">
        <div className="leaderboard">
          <h1>
            <Trophy fill="#B2D2A4" />
            Travel Score
            {emojiBasedOnscore('Travel Score')}
          </h1>
          <ul>
            <li>
              <mark>You</mark>
              <small>{currentUser.transportationScore}</small>
            </li>
          </ul>
          <ol>
            {Function.topTravelScores(users.filter(user => (user.city === currentUser.city))).map((user, index) => <li key={index}><mark>{`${user.firstName} ${user.lastName}`}</mark><small>{user.transportationScore}</small></li>)}
          </ol>
        </div>
      </Carousel.Item>
    </Carousel>
  ) : <LoadingSpinner />);
};

export default NeighborLeaderBoard;
