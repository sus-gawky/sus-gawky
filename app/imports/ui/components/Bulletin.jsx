import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Grid, Segment } from 'semantic-ui-react';

/** Displays messages and an addMessage field if readOnly = false */
const Bulletin = ({ bulletin, currentUser, users }) => {
  const message = bulletin.message;
  const from = users.filter(user => (user.owner === message.from));
  const ownMessage = bulletin.from === currentUser;
  const position = ownMessage ? 'right' : 'left';
  const color = ownMessage ? 'green' : 'teal';
  const nameDisplayed = ownMessage ? 'Me' : `${from[0].firstName} ${from[0].lastName}`;
  return (
    <Feed.Event>
      <Feed.Content>
        <Segment basic floated={position}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column textAlign="right">
                {nameDisplayed}
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Feed.Summary>
                  <Feed.Date content={bulletin.createdAt.toLocaleDateString('en-US')} />
                </Feed.Summary>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment inverted color={color}>
            <Feed.Extra autoComplete="off">
              {bulletin.message}
            </Feed.Extra>
          </Segment>
        </Segment>
      </Feed.Content>
    </Feed.Event>);
};

Bulletin.propTypes = {
  bulletin: PropTypes.shape({
    message: String,
    from: String,
    createdAt: Date,
    zipCode: Number,
  }).isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

export default Bulletin;
