import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const MarkFoodReady = ({ food }) => {
  const handleMarkReadyClick = () => {
    console.log(food._id);
    Meteor.call('markFoodAsReady', food._id, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Food marked as ready!');
      }
    });
  };

  return (
    <div>
      <h2>{food.name}</h2>
      <p>Status: {food.availability}</p>
      <Button onClick={handleMarkReadyClick}>Mark as Ready</Button>
    </div>
  );
};

MarkFoodReady.propTypes = {
  food: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    cuisineType: PropTypes.string,
    vendor: PropTypes.string,
    availability: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default MarkFoodReady;
