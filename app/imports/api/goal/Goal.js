import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class GoalsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'GoalsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      goal: String,
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
 * The singleton instance of the GoalsCollection.
 * @type {GoalCollection}
 */
export const Goals = new GoalsCollection();
