import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const FoodItems = ({ fooditems }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = (foodItemId) => {
    setItemToDelete(foodItemId);
    setShowConfirm(true); // Show the confirmation dialog
  };

  const confirmDelete = () => {
    // Call Meteor method with the item ID to delete
    Meteor.call('fooditems.remove', itemToDelete, (error) => {
      if (error) {
        console.error('Error deleting item:', error);
      } else {
        console.log('Item deleted successfully');
      }
      setItemToDelete(null);
      setShowConfirm(false);
    });
  };

  /* const handleMarkReadyClick = () => {
    Meteor.call('markFoodAsReady', fooditems._id, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Food marked as ready!');
        setIsReady(true);
      }
    });
  };
  const handleMarkUnReadyClick = () => {
    Meteor.call('markFoodAsReady', fooditems._id, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Food marked as ready!');
        setIsReady(false);
      }
    });
  }; */

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowConfirm(false);
  };

  return (
    <>
      <Card className="h-80">
        <Card.Header>
          <Image src={fooditems.image} width={250} height={200} />
          <Card.Title>{fooditems.name}</Card.Title>
          <Card.Subtitle>Cuisine Type: {fooditems.cuisineType}</Card.Subtitle>
          <Card.Subtitle>Availability: {fooditems.availability}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>{fooditems.description}</Card.Text>
          <Link to={`/edit-food-item/${fooditems._id}`} className="btn btn-primary">Edit</Link>
          <Button className="mx-2" variant="danger" onClick={() => handleDelete(fooditems._id)}>Delete</Button>
        </Card.Body>
      </Card>
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this item?</p>
          <Button onClick={confirmDelete}>Yes</Button>
          <Button onClick={cancelDelete}>No</Button>
        </div>
      )}
    </>
  );
};

// Require a document to be passed to this component.
FoodItems.propTypes = {
  fooditems: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    cuisineType: PropTypes.string,
    vendor: PropTypes.string,
    availability: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default FoodItems;
