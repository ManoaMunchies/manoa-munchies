// server/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Email } from 'meteor/email';
import { Foods } from '../imports/api/fooditems/Foods';
import { FoodSubscriptions } from '../imports/api/fooditems/FoodSubscriptions';
import { Vendors } from '../imports/api/vendors/Vendors';
import { UserPreferences } from '../imports/api/userpreferences/UserPreferences';
import { UserProfiles } from '../imports/api/userpreferences/UserProfiles';

process.env.MAIL_URL = 'smtp://manoamunchies3@gmail.com:ICS314!@@smtp.gmail.com:465';
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

Meteor.methods({
  'userPreferences.get'(userId) {
    check(userId, String);
    // Authorization checks here
    return UserPreferences.collection.findOne({ owner: userId });
  },

  'userPreferences.update'(userId, preferences) {
    check(userId, String);
    check(preferences, { cuisinePreferences: Array, dietRestrictions: Array });
    // Ensure preferences.cuisinePreferences is an array
    if (!Array.isArray(preferences.cuisinePreferences)) {
      throw new Meteor.Error('invalid-data', 'Cuisine Preferences must be an array.');
    }
    // Ensure preferences.dietRestrictions is an array
    if (!Array.isArray(preferences.dietRestrictions)) {
      throw new Meteor.Error('invalid-data', 'Diet Restrictions must be an array.');
    }
    UserPreferences.collection.upsert({ owner: userId }, { $set: preferences });
  },
});

// Methods for update users profiles
Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'userProfiles.update'(formData) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
    }

    const { _id, ...updatedData } = formData;
    // Add the { multi: false } option to update a single document
    const result = UserProfiles.collection.update({ _id: formData._id }, { $set: updatedData }, { multi: false });
    if (result === 0) {
      throw new Meteor.Error('update-failed', 'Failed to update the user profile.');
    }
  },
});

// Notification subscribe food for user
Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  subscribeToFood(foodName) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to subscribe to food.');
    }
    console.log(this.userId);
    if (typeof foodName !== 'string') {
      throw new Meteor.Error('invalid-argument', 'Invalid food name.');
    }

    const existingSubscription = Foods.collection.findOne({ userId: this.userId, foodName });
    if (existingSubscription) {
      throw new Meteor.Error('already-subscribed', 'You are already subscribed to this food.');
    }
    FoodSubscriptions.collection.insert({
      userId: this.userId,
      foodName: foodName,
      createdAt: new Date(),
    });
  },
});

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  markFoodAsReady(foodId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to mark food as ready.');
    }

    if (typeof foodId !== 'string') {
      throw new Meteor.Error('invalid-argument', 'Invalid food ID.');
    }

    const food = Foods.collection.findOne(foodId);
    if (!food) {
      throw new Meteor.Error('food-not-found', 'Food item not found.');
    }

    Foods.collection.update(foodId, {
      $set: {
        availability: 'available',
      },
    });

    const subscribedUsers = FoodSubscriptions.collection.find({ foodName: food.name }).fetch();
    subscribedUsers.forEach((subscription) => {
      const user = Meteor.users.findOne(subscription.userId);
      const userEmail = user.emails[0].address;
      console.log(userEmail);
      const subject = 'Food Ready Notification';
      const text = `Your subscribed food "${food.name}" is now ready. Enjoy your meal!`;
      Email.send({
        to: userEmail,
        from: 'AlohaEats <manoamunchies3@gmail.com>',
        subject,
        text,
      });
    });
  },
});
