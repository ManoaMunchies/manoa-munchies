import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';

const SubscribeFood = () => {
  const [foodName, setFoodName] = useState('');

  const handleSubscribeClick = () => {
    if (foodName) {
      Meteor.call('subscribeToFood', foodName, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Subscribed successfully!');
        }
      });
    }
  };

  return (
    <div>
      <h1>Subscribe to Food Notifications</h1>
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        placeholder="Enter food name"
      />
      <Button onClick={handleSubscribeClick}>Subscribe</Button>
    </div>
  );
};

export default SubscribeFood;
