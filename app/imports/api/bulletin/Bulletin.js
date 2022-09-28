import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class BulletinsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'BulletinsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    const commentSchema = new SimpleSchema({
      text: String,
      from: String,
      createdAt: Date,
    });
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      subject: String,
      message: String,
      from: String,
      createdAt: Date,
      zipCode: Number,
      comments: {
        type: Array,
        optional: true,
      },
      'comments.$': { type: commentSchema },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Bulletins = new BulletinsCollection();
