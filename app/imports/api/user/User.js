import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';

/**
 * The UsersCollection. It encapsulates state and variable values for users.
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

  // Transportation:
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
      firstName: String,
      lastName: String,
      owner: String,
      zipCode: Number,
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

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'dailyCheckIn'(owner, fullScore, foodScore, transportationScore, miscScore) {
    console.log(`dailyCheckIn ${owner} ${fullScore} ${foodScore} ${transportationScore} ${miscScore}`);
    // TODO Check if user is owner, if they are, don't delete
    Users.collection.update(
      { owner: owner },
      { $set: { fullScore, foodScore, transportationScore, miscScore } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Daily check-in completed successfully!', 'success')),
    );
  },
});
