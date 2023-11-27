import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const VendorItem = ({ vendors }) => (
  <tr>
    <td>{vendors.name}</td>
    <td>{vendors.location}</td>
    <td>{vendors.hours}</td>
    <td>
      <Link to={`/menu?vendor=${encodeURIComponent(vendors.name)}`}>See Menu</Link>
    </td>
  </tr>
);

VendorItem.propTypes = {
  vendors: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
  }).isRequired,

};

export default VendorItem;
