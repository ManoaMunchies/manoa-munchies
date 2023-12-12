import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The Reviews collection. It encapsulates state for reviews.
 */
class ReviewsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ReviewsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      reviewerName: {
        type: String,
        required: true,
      },
      vendorName: {
        type: String,
        required: true,
      },
      reviewText: {
        type: String,
        required: true,
      },
      stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      owner: {
        type: String,
        required: true,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.vendorPublicationName = `${this.name}.publication.vendor`;
  }
}

/**
 * The singleton instance of the ReviewsCollection.
 * @type {ReviewsCollection}
 */
export const Reviews = new ReviewsCollection();
