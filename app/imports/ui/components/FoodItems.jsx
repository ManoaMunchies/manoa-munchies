import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image, Badge } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const FoodItems = ({ fooditems }) => {
  const [showDiet, setShowDiet] = useState(null);
  const [available, setAvailable] = useState(null);
  const [subscribe, setSubscribe] = useState(null);
  const [alert, setAlert] = useState(null);

  const getDietaryOptions = () => {
    const options = [];
    if (fooditems.dietOptions?.isVegan) options.push('Vegan');
    if (fooditems.dietOptions?.isVegetarian) options.push('Vegetarian');
    if (fooditems.dietOptions?.isGlutenFree) options.push('Gluten-Free');
    if (fooditems.dietOptions?.isDairyFree) options.push('Dairy-Free');
    if (fooditems.dietOptions?.isNutFree) options.push('Nut-Free');
    return options.join(', ');
  };

  const handleFoodSubscribe = (foodName) => {
    // Call a server-side method to subscribe the user to the food
    Meteor.call('subscribeToFood', foodName, (error) => {
      if (error) {
        // Handle subscription error
        console.log(error);
        setAlert(false);
      } else {
        // Subscription successful
        setAlert(true);
        setSubscribe(false);
        console.log('Subscribed successfully!');
      }
    });
  };

  useEffect(() => {
    if (fooditems.dietOptions != null) {
      setShowDiet(true);
    }

    if (fooditems.availability === 'available') {
      setAvailable(true);
      setSubscribe(false);
    } else {
      setAvailable(false);
      setSubscribe(true);
    }
  }, [fooditems]);

  return (
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
        <Card.Title><h4>{fooditems.name}</h4></Card.Title>
        <Card.Subtitle><h6>Vendor: {fooditems.vendor}</h6></Card.Subtitle>
        <Card.Subtitle><h6>Cuisine Type: {fooditems.cuisineType}</h6></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{fooditems.description}</Card.Text>
        {subscribe && (
          <Button className="mx-2" variant="success" onClick={() => handleFoodSubscribe(fooditems._id)}>Notify me</Button>
        )}
        {alert && (
          <Button className="mx-2" variant="success">Subscribed</Button>
        )}
      </Card.Body>
    </Card>
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
    dietOptions: PropTypes.objectOf(PropTypes.bool),
    _id: PropTypes.string,
  }).isRequired,
};

export default FoodItems;
