import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the FoodItems (Admin) table. See pages/ListStuffAdmin.jsx. */
const FoodItemsVendor = ({ fooditems }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDiet, setShowDiet] = useState(null);
  const [available, setAvailable] = useState(null);
  const [showReadyButton, setShowReadyButton] = useState(null);

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

  const handleMarkReadyClick = () => {
    Meteor.call('markFoodAsReady', fooditems._id, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Food marked as ready!');
      }
    });
  };

  const getDietaryOptions = () => {
    const options = [];
    if (fooditems.dietOptions?.isVegan) options.push('Vegan');
    if (fooditems.dietOptions?.isVegetarian) options.push('Vegetarian');
    if (fooditems.dietOptions?.isGlutenFree) options.push('Gluten-Free');
    if (fooditems.dietOptions?.isDairyFree) options.push('Dairy-Free');
    if (fooditems.dietOptions?.isNutFree) options.push('Nut-Free');
    return options.join(', ');
  };

  useEffect(() => {
    if (fooditems.dietOptions != null) {
      setShowDiet(true);
    }

    if (fooditems.availability === 'available') {
      setAvailable(true);
      setShowReadyButton(false);
    } else {
      setAvailable(false);
      setShowReadyButton(true);
    }
  }, [fooditems]);

  return (
    <>
      <Card className="h-80">
        <Card.Header>
          <Image src={fooditems.image} width={250} height={200} />
          <hr />
          {showDiet && (
            <Badge pill bg="info">
              Diets: {getDietaryOptions()}
            </Badge>
          )}
          {available && (
            <Badge pill bg="success">
              Availability: {fooditems.availability}
            </Badge>
          )}
          {!available && (
            <Badge pill bg="danger">
              Availability: {fooditems.availability}
            </Badge>
          )}
          <Card.Title>{fooditems.name}</Card.Title>
          <Card.Subtitle>Cuisine Type: {fooditems.cuisineType}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>{fooditems.description}</Card.Text>
          <Link to={`/edit-food-item/${fooditems._id}`} className="btn btn-primary">Edit</Link>
          <Button className="mx-2" variant="danger" onClick={() => handleDelete(fooditems._id)}>Delete</Button>
          {showReadyButton && (
            <Button className="mx-1" variant="success" onClick={() => handleMarkReadyClick()}>Ready</Button>
          )}
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
FoodItemsVendor.propTypes = {
  fooditems: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    cuisineType: PropTypes.string,
    vendor: PropTypes.string,
    availability: PropTypes.string,
    dietOptions: PropTypes.shape({
      isVegan: PropTypes.bool,
      isVegetarian: PropTypes.bool,
      isGlutenFree: PropTypes.bool,
      isDairyFree: PropTypes.bool,
      isNutFree: PropTypes.bool,
    }),
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default FoodItemsVendor;
