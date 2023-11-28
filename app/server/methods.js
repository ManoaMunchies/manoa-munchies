// server/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Foods } from '/imports/api/fooditems/Foods';

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
