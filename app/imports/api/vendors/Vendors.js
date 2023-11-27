import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class VendorsCollection {
  constructor() {
    this.name = 'VendorsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      name: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
        allowedValues: ['Paradise Palms Café', 'Food Truck Row', 'Shidler College', 'Campus Center', 'Hemenway', 'Gateway House', 'Athletic Complex', 'Hale Aloha', 'Hale Noelani'],
      },
      hours: {
        type: String,
        required: true,
      },
      owner: {
        type: String,
        required: true,
      },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.vendorPublicationName = `${this.name}.publication.vendor`;
  }
}
/**
 * The singleton instance of the VendorsCollection.
 * @type {VendorsCollection}
 */
export const Vendors = new VendorsCollection();
