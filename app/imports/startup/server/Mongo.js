import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Vendors } from '../../api/vendor/Vendors';
import { Profiles } from '../../api/user/Profiles';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
// Initialize the StuffsCollection if empty.

const addVendor = (vendor) => {
  console.log(`  Adding: ${vendor.name} (${vendor.owner})`);
  Vendors.collection.insert(vendor);
};

// Initialize the StuffsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendor.');
    Meteor.settings.defaultVendors.forEach(vendor => addVendor(vendor));
  }
}

const addUser = (profile) => {
  console.log(`  Adding: ${profile.firstName} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default user profile.');
    Meteor.settings.defaultUsers.forEach(profile => addUser(profile));
  }
}
