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
      image: {
        type: String,
        optional: true,
      },
      description: {
        type: String,
        optional: true,
      },
      cuisineType: {
        type: String,
        allowedValues: ['breakfast', 'american', 'hawaiian', 'chinese', 'japanese', 'korean', 'thai', 'indian', 'mexican'],
      },
      vendor: String,
      owner: String,
      availability: {
        type: String,
        allowedValues: ['available', 'unavailable'],
        defaultValue: 'available',
      },
      isTopPick: {
        type: Boolean,
        defaultValue: false,
      },
      dietOptions: {
        type: Object,
        optional: true,
      },
      'dietOptions.isVegan': {
        type: Boolean,
        defaultValue: false,
      },
      'dietOptions.isVegetarian': {
        type: Boolean,
        defaultValue: false,
      },
      'dietOptions.isGlutenFree': {
        type: Boolean,
        defaultValue: false,
      },
      'dietOptions.isDairyFree': {
        type: Boolean,
        defaultValue: false,
      },
      'dietOptions.isNutFree': {
        type: Boolean,
        defaultValue: false,
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
