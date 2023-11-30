import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the FoodItems (Admin) table. See pages/ListStuffAdmin.jsx. */
const FoodItemsAdmin = ({ fooditems }) => {
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

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowConfirm(false);
  };
  const handleTopPickChange = (foodItemId, isTopPick) => {
    Meteor.call('fooditems.updateTopPick', foodItemId, isTopPick, (error) => {
      if (error) {
        console.error('Error updating top pick status:', error);
      } else {
        console.log('Top pick status updated successfully');
      }
    });
  };

  return (
    <>
      <tr>
        <td>{fooditems.name}</td>
        <td>{fooditems.quantity}</td>
        <td>{fooditems.cuisineType}</td>
        <td>{fooditems.vendor}</td>
        <td>{fooditems.availability}</td>
        <td>{fooditems.owner}</td>
        <td>
          <input
            type="checkbox"
            checked={fooditems.isTopPick}
            onChange={(e) => handleTopPickChange(fooditems._id, e.target.checked)}
          />
        </td>
        <td>
          <Link to={`/edit-food-item-admin/${fooditems._id}`} className="btn btn-primary">Edit</Link>
        </td>
        <td><Button variant="danger" onClick={() => handleDelete(fooditems._id)}>Delete</Button></td>
      </tr>
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
FoodItemsAdmin.propTypes = {
  fooditems: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    cuisineType: PropTypes.string,
    vendor: PropTypes.string,
    availability: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
    isTopPick: PropTypes.bool,
  }).isRequired,
};

export default FoodItemsAdmin;
