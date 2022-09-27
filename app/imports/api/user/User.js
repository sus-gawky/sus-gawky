import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';

/**
 * The UsersCollection. It encapsulates state and variable values for users.
 */

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
      // Food:
      wastedFood: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },
      minutesShowerRunning: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },
      // TODO: change this to percentages eventually
      mainProteinSource: {
        type: String,
        allowedValues: ['Beef', 'Pork', 'Dairy', 'Eggs', 'Poultry', 'Fish', 'Plant-based'],
        optional: true,
      },
      // Transportation:
      gasolineUsed: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },
      // Misc:
      PlasticItemsThrownAway: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },
      // Not-daily
      electricityBill: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },

      waterBill: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },

      donation: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },

      volunteer: {
        type: Number,
        defaultValue: -1,
        optional: true,
      },
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
        swal(`Today's Score: ${fullScore}`, 'Continute being a gawkysaur!', 'success')),
    );
  },

  // eslint-disable-next-line meteor/audit-argument-checks
  'specialCheckIn'(owner, electricityBill, waterBill, donation, volunteer) {
    console.log(`specialCheckIn ${owner} ${electricityBill} ${waterBill} ${donation} ${volunteer}`);
    Users.collection.update(
      { owner: owner },
      { $set: { electricityBill, waterBill, donation, volunteer } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Special check-in completed successfully!', 'success')),
    );
    /*
    carbonFootprintScore: {
        type: Number,
        optional: true,
      },
    * */
  },
});
