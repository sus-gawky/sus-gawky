import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Users } from '../../api/user/User.js';
import { Bulletins } from '../../api/bulletin/Bulletin.js';

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

const addBulletins = (bulletin) => {
  console.log(`  Adding bulletin for zipcode: ${bulletin.zipcode}`);
  Bulletins.collection.insert(bulletin);
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

if (Bulletins.collection.find().count() === 0) {
  if (Meteor.settings.defaultBulletins) {
    console.log('Creating bulletins.');
    Meteor.settings.defaultBulletins.map(data => addBulletins(data));
  }
}
