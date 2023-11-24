import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The Foods collection. It encapsulates state and variable values for Foods.
 */
class FoodsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FoodItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      quantity: Number,
      vendorId: String,
      cuisineType: {
        type: String,
        allowedValues: ['breakfast', 'american', 'hawaiian'],
      },
      owner: String,
      availability: {
        type: String,
        allowedValues: ['available', 'unavailable'],
        defaultValue: 'available',
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
 * The singleton instance of the StuffsCollection.
 * @type {FoodsCollection}
 */
export const Foods = new FoodsCollection();
