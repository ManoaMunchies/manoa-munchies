import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const FoodItems = ({ fooditems }) => (
  <tr>
    <td>{fooditems.name}</td>
    <td>{fooditems.quantity}</td>
    <td>{fooditems.vendorId}</td>
    <td>{fooditems.cuisineType}</td>
    <td>{fooditems.availability}</td>
  </tr>
);

// Require a document to be passed to this component.
FoodItems.propTypes = {
  fooditems: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    vendorId: PropTypes.string,
    cuisineType: PropTypes.string,
    availability: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FoodItems;
