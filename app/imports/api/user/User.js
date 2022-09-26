import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The UsersCollection. It encapsulates state and variable values for stuff.
 */

const specificInfosSchema = new SimpleSchema({
  // Food:
  wastedFood: {
    type: Number,
    defaultValue: -1,
  },
  minutesShowerRunning: {
    type: Number,
    defaultValue: -1,
  },
  // TODO: change this to percentages eventually
  mainProteinSource: {
    type: String,
    allowedValues: ['Beef', 'Pork', 'Dairy', 'Eggs', 'Poultry', 'Fish', 'Plant-based'],
  },

  // Transportion:
  gasolineUsed: {
    type: Number,
    defaultValue: -1,
  },
  // Misc:
  PlasticItemsThrownAway: {
    type: Number,
    defaultValue: -1,
  },
});

class UsersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UsersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      // All scores out of 100
      fullScore: Number,
      foodScore: Number,
      transportationScore: Number,
      miscScore: Number,
      carbonFootprintScore: {
        type: Number,
        optional: true,
      },
      householdSize: Number,
      specificInfos: {
        type: Array,
        optional: true,
      },
      'specificInfos.$': { type: specificInfosSchema },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the UsersCollection.
 * @type {UsersCollection}
 */
export const Users = new UsersCollection();
