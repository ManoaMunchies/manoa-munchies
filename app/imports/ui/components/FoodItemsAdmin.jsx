import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const FoodItemsAdmin = ({ fooditems }) => (
  <tr>
    <td>{fooditems.name}</td>
    <td>{fooditems.quantity}</td>
    <td>{fooditems.cuisineType}</td>
    <td>{fooditems.vendor}</td>
    <td>{fooditems.availability}</td>
    <td>{fooditems.owner}</td>
    <td>
      <Link to={`/edit-food-item/${fooditems._id}`} className="btn btn-primary">Edit</Link>
    </td>
  </tr>
);

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
  }).isRequired,
};

export default FoodItemsAdmin;
