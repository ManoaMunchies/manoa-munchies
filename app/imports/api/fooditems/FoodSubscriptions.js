import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The FoodSubscriptions. It encapsulates state and variable values for Vendor.
 */
class FoodSubscriptionCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FoodSubscriptionCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userId: String,
      foodName: String,
      createdAt: Date(),
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {FoodSubscriptionCollection}
 */
export const FoodSubscriptions = new FoodSubscriptionCollection();
