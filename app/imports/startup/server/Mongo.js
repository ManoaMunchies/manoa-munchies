import { Meteor } from 'meteor/meteor';
import { Foods } from '../../api/fooditems/Foods';
import { Vendors } from '../../api/vendors/Vendors';
import { UserProfiles } from '../../api/userpreferences/UserProfiles';

// Initialize the database with a default data document.
const addFoodData = (foodData) => {
  console.log(`  Adding: ${foodData.name} (${foodData.owner})`);
  Foods.collection.insert(foodData);
};

const addVendorData = (vendorData) => {
  console.log(`  Adding: ${vendorData.name} (${vendorData.owner})`);
  Vendors.collection.insert(vendorData);
};

// eslint-disable-next-line no-unused-vars
const addUserData = (userData) => {
  console.log(`  Adding Default Profile: ${userData.firstName} (${userData.owner})`);
  UserProfiles.collection.insert(userData);
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

if (UserProfiles.collection.find().count() === 0 && Meteor.users.find().count() > 0) {
  if (Meteor.isServer) {
    console.log('Creating default user data.');
    Meteor.users.find().forEach(function (user) { addUserData({ firstName: user.username, image: '/images/defaultImage.png', owner: user.username }); });
  }
}
