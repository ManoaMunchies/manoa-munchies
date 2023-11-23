import React from 'react';
import PropTypes from 'prop-types';

const VendorItem = ({ vendor }) => (
  <tr>
    <td>{vendor.name}</td>
    <td>{vendor.vendorId}</td>
    <td>{vendor.location}</td>
    <td>{vendor.hours}</td>
  </tr>
);

VendorItem.propTypes = {
  vendor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vendorId: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
  }).isRequired,

};

export default VendorItem;
