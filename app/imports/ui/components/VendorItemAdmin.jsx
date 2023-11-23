import React from 'react';
import PropTypes from 'prop-types';

const VendorItemAdmin = ({ vendor }) => (
  <tr>
    <td>{vendor.name}</td>
    <td>{vendor.vendorId}</td>
    <td>{vendor.location}</td>
    <td>{vendor.hours}</td>
    <td>{vendor.owner}</td>
  </tr>
);

VendorItemAdmin.propTypes = {
  vendor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vendorId: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,

};

export default VendorItemAdmin;
