import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Users } from '../../api/user/User.js';
import { Challenges } from '../../api/challenge/Challenge';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the database with a default data document.
const addChallenges = (data) => {
  console.log(`  Adding: ${data.challenge} (${data.owner})`);
  Challenges.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Initialize the database with a default data document.
const userData = (data) => {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Users.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.Users) {
    console.log('Creating default data.');
    Meteor.settings.Users.forEach(data => userData(data));

// Initialize the StuffsCollection if empty.
if (Challenges.collection.find().count() === 0) {
  if (Meteor.settings.challenges) {
    console.log('Creating default data.');
    Meteor.settings.challenges.forEach(data => addChallenges(data));
  }
}
