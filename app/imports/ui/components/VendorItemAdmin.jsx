import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const VendorItemAdmin = ({ vendors }) => (
  <tr>
    <td>{vendors.name}</td>
    <td>{vendors.location}</td>
    <td>{vendors.hours}</td>
    <td>{vendors.owner}</td>
    <td>
      <Link to={`/edit-vendor-item-admin/${vendors._id}`} className="btn btn-primary">Edit</Link>
    </td>
  </tr>
);

VendorItemAdmin.propTypes = {
  vendors: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,

};

export default VendorItemAdmin;
