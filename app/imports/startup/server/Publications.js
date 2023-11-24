import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Foods } from '../../api/fooditems/Foods';
import { Vendors } from '../../api/vendors/Vendors';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});
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
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

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
