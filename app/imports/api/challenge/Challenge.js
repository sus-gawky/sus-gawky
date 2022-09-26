import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

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
      points: String,
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
 * @type {ChallengeCollection}
 */
export const Challenges = new ChallengesCollection();
