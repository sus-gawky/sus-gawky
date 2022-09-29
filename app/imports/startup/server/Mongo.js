import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Users } from '../../api/user/User.js';
import { Challenges } from '../../api/challenge/Challenge';
import { Tips } from '../../api/tip/Tips';
import { Merch } from '../../api/merch/Merch';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

const addUsers = (user) => {
  console.log(`  Adding: ${user.firstName}`);
  Users.collection.insert(user);
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

if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating users.');
    Meteor.settings.defaultUsers.map(data => addUsers(data));
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
    console.log('Creating default users.');
    Meteor.settings.Users.forEach(data => userData(data));
  }
}
// Initialize the StuffsCollection if empty.
if (Challenges.collection.find().count() === 0) {
  if (Meteor.settings.challenges) {
    console.log('Creating default challenges.');
    Meteor.settings.challenges.forEach(data => addChallenges(data));
  }
}

// Initialize the database with a default data document.
const addTips = (data) => {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Tips.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Tips.collection.find().count() === 0) {
  if (Meteor.settings.tips) {
    console.log('Creating default tips.');
    Meteor.settings.tips.forEach(data => addTips(data));
  }
}

const addMerch = (data) => {
  console.log(`  Adding: ${data.desc})`);
  Merch.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Merch.collection.find().count() === 0) {
  if (Meteor.settings.defaultMerch) {
    console.log('Creating default merch.');
    Meteor.settings.defaultMerch.forEach(data => addMerch(data));
  }
}
