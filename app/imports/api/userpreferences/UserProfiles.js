import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfilesCollection. It encapsulates state and variable values for Vendor.
 */
class UserProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UserProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: {
        type: String,
        optional: true,
      },
      title: {
        type: String,
        optional: true,
      },
      image: {
        type: String,
        optional: true,
      },
      instagram: {
        type: String,
        optional: true,
      },
      bio: {
        type: String,
        optional: true,
      },
      owner: String,
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
 * @type {UserProfilesCollection}
 */
export const UserProfiles = new UserProfilesCollection();
