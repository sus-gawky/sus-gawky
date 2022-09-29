import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Users } from '../user/User';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class ChallengesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ChallengesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      challenge: String,
      description: String,
      owner: String,
      signUpList: Array,
      'signUpList.$': { type: String },
      tags: Array,
      'tags.$': { type: String },
      endDate: String,
      points: Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.ownerPublicationName = `${this.name}.publication.owner`;
  }
}

/**
 * The singleton instance of the ChallengesCollection.
 * @type {ChallengesCollection}
 */
export const Challenges = new ChallengesCollection();

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'updateChallenge'(challengeId, newChallenger) {
    console.log(`updateChallenge ${challengeId} ${newChallenger} `);
    // TODO Check if user is already in list
    Challenges.collection.update(
      { _id: challengeId },
      { $push: { signUpList: newChallenger } },
    );
  },

  // eslint-disable-next-line meteor/audit-argument-checks
  'leaveChallenge'(challengeId, challenger, givePoints, numberOfPoints) {
    console.log(`leaveChallenge ${challengeId} ${challenger} `);
    // TODO Check if user is owner, if they are, don't delete
    Challenges.collection.update(
      { _id: challengeId },
      { $pull: { signUpList: challenger } },
    );
    if (givePoints) {
      // increment the user's points
      Users.collection.update(
        { owner: challenger },
        { $inc: { points: numberOfPoints } },
      );
    }
  },
});
