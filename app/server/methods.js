// server/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Foods } from '/imports/api/fooditems/Foods';
import { Vendors } from '../imports/api/vendors/Vendors';

// delete menu item
Meteor.methods({
  'fooditems.remove'(foodItemId) {
    console.log('foodItem.owner:', foodItemId.owner);
    console.log('this.userId:', this.userId);

    check(foodItemId, String);

    const foodItem = Foods.collection.findOne(foodItemId);
    if (!foodItem) {
      throw new Meteor.Error('Item not found');
    }

    // // Check if the current user is the owner of the item
    // if (foodItem.owner !== this.userId.email) {
    //   throw new Meteor.Error('Not authorized');
    // }

    Foods.collection.remove(foodItemId);
  },
});

// delete vendor
Meteor.methods({
  'vendors.remove'(vendorId) {
    console.log('vendor.owner:', vendorId.owner);
    console.log('this.userId:', this.userId);

    check(vendorId, String);

    const vendor = Vendors.collection.findOne(vendorId);
    if (!vendor) {
      throw new Meteor.Error('Item not found');
    }

    // // Check if the current user is the owner of the item
    // if (foodItem.owner !== this.userId.email) {
    //   throw new Meteor.Error('Not authorized');
    // }

    Vendors.collection.remove(vendorId);
  },
});

Meteor.methods({
  'users.updateRole'(userId, newRole) {
    check(userId, String);
    check(newRole, String);

    // Ensure only admins can perform this action
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    // Update the user's role
    Roles.setUserRoles(userId, newRole);
  },
});

Meteor.methods({
  'users.remove'(userId) {
    check(userId, String);

    // Ensure only admins can perform this action
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    // Prevent self-deletion for safety
    if (userId === this.userId) {
      throw new Meteor.Error('not-allowed', 'You cannot delete your own account');
    }

    // Delete the user
    Meteor.users.remove(userId);
  },
});
Meteor.methods({
  'fooditems.updateTopPick'(foodItemId, isTopPick) {
    check(foodItemId, String);
    check(isTopPick, Boolean);

    // Additional security checks if necessary

    Foods.collection.update(foodItemId, {
      $set: { isTopPick },
    });
  },
});
