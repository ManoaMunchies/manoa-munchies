import { Meteor } from 'meteor/meteor';
import { Foods } from '../../api/fooditems/Foods';
import { Vendors } from '../../api/vendors/Vendors';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addFoodData = (foodData) => {
  console.log(`  Adding: ${foodData.name} (${foodData.owner})`);
  Foods.collection.insert(foodData);
};

const addVendorData = (vendorData) => {
  console.log(`  Adding: ${vendorData.name} (${vendorData.owner})`);
  Vendors.collection.insert(vendorData);
};

if (Foods.collection.find().count() === 0) {
  if (Meteor.settings.defaultDataFoodItems) {
    console.log('Creating default food data.');
    Meteor.settings.defaultDataFoodItems.forEach(foodData => addFoodData(foodData));
  }
}
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultDataVendors) {
    console.log('Creating default vendor data.');
    Meteor.settings.defaultDataVendors.forEach(vendorData => addVendorData(vendorData));
  }
}
