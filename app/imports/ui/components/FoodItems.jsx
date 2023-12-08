import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const FoodItems = ({ fooditems }) => {
  const getDietaryOptions = () => {
    const options = [];
    if (fooditems.dietOptions?.isVegan) options.push('Vegan');
    if (fooditems.dietOptions?.isVegetarian) options.push('Vegetarian');
    if (fooditems.dietOptions?.isGlutenFree) options.push('Gluten-Free');
    if (fooditems.dietOptions?.isDairyFree) options.push('Dairy-Free');
    if (fooditems.dietOptions?.isNutFree) options.push('Nut-Free');
    return options.join(', ');
  };
  return (

    <tr>
      <td>{fooditems.name}</td>
      <td>{fooditems.quantity}</td>
      <td>{fooditems.cuisineType}</td>
      <td>{fooditems.vendor}</td>
      <td>{getDietaryOptions()}</td>
      <td>{fooditems.availability}</td>
    </tr>
  );
};

// Require a document to be passed to this component.
FoodItems.propTypes = {
  fooditems: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    cuisineType: PropTypes.string,
    vendor: PropTypes.string,
    availability: PropTypes.string,
    dietOptions: PropTypes.objectOf(PropTypes.bool),
    _id: PropTypes.string,
  }).isRequired,
};

export default FoodItems;
