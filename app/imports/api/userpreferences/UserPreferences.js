import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The UserPreferencesCollection. It encapsulates state and variable values for user preferences.
 */
class UserPreferencesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UserPreferencesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      cuisinePreferences: {
        type: Object,
        optional: true,
      },
      'cuisinePreferences.isAmerican': {
        type: Boolean,
        defaultValue: true,
      },
      'cuisinePreferences.isHawaiian': {
        type: Boolean,
        defaultValue: true,
      },
      'cuisinePreferences.isChinese': {
        type: Boolean,
        defaultValue: true,
      },
      'cuisinePreferences.isJapanese': {
        type: Boolean,
        defaultValue: true,
      },
      'cuisinePreferences.isKorean': {
        type: Boolean,
        defaultValue: true,
      },
      'cuisinePreferences.isThai': {
        type: Boolean,
        defaultValue: true,
      },
      'cuisinePreferences.isIndian': {
        type: Boolean,
        defaultValue: true,
      },
      'cuisinePreferences.isMexican': {
        type: Boolean,
        defaultValue: true,
      },
      dietRestrictions: {
        type: Object,
        optional: true,
      },
      'dietRestrictions.isVegan': {
        type: Boolean,
        defaultValue: false,
      },
      'dietRestrictions.isVegetarian': {
        type: Boolean,
        defaultValue: false,
      },
      'dietRestrictions.isGlutenFree': {
        type: Boolean,
        defaultValue: false,
      },
      'dietRestrictions.isDairyFree': {
        type: Boolean,
        defaultValue: false,
      },
      'dietRestrictions.isNutFree': {
        type: Boolean,
        defaultValue: false,
      },
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {UserPreferencesCollection}
 */
export const UserPreferences = new UserPreferencesCollection();
