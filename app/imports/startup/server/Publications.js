import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Foods } from '../../api/fooditems/Foods';
import { Vendors } from '../../api/vendors/Vendors';
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.

Meteor.publish(Foods.userPublicationName, function () {
  if (this.userId) {
    if (this.userId && Roles.userIsInRole(this.userId, 'user')) {
      return Foods.collection.find();
    }
  }
  return this.ready();
});
// if logged in with user role, then publish vendor information
Meteor.publish(Vendors.userPublicationName, function () {
  if (this.userId) {
    if (this.userId && Roles.userIsInRole(this.userId, 'user')) {
      return Vendors.collection.find();
    }
  }
  return this.ready();
});
// Admin-level publication.
// if logged in with admin role, then publsih vendor information
Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Vendors.collection.find();
  }
  return this.ready();
});
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.

Meteor.publish(Foods.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Foods.collection.find();
  }
  return this.ready();
});

// Vendor-level publication.
// If logged in with vendor role, publish VendorCollection documents for this owner. Otherwise publish nothing.
Meteor.publish(Vendors.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Vendors.collection.find();
  }
  return this.ready();
});
// If logged in with vendor role, publish FoodsCollection documents for this owner. Otherwise publish nothing.
Meteor.publish(Foods.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Foods.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// publication for specific vendors to display their food items and their information
Meteor.publish('myVendorData', function () {
  if (!this.userId) {
    return this.ready();
  }
  const user = Meteor.users.findOne(this.userId);
  return Vendors.collection.find({ owner: user.username });
});
// publication for specific vendors to display their food items and their information
Meteor.publish('myFoodData', function () {
  if (!this.userId) {
    return this.ready();
  }
  const user = Meteor.users.findOne(this.userId);
  return Foods.collection.find({ owner: user.username });
});

Meteor.publish('foodItemsByVendor', function (vendorName) {
  // Add necessary checks for vendorId validity and user permissions
  check(vendorName, String);
  return Foods.collection.find({ vendor: vendorName });
});

// publication for admins to display all vendors and their information
Meteor.publish('allVendorData', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Vendors.collection.find();
});

// publication for admins to display all acounts and their information
Meteor.publish('allUserData', function () {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({}, { fields: { username: 1, emails: 1, roles: 1 } });
  }
  return this.ready();

});

// publication for admins to display all user roles
Meteor.publish('allUsersRoles', function () {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    // Publish roles of all users
    return Meteor.roleAssignment.find({});
  }
  // Only publish if the user is an admin
  return this.ready();

});
