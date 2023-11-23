import React from 'react';
import PropTypes from 'prop-types';

const VendorItem = ({ vendor }) => (
  <tr>
    <td>{vendor.name}</td>
    <td>{vendor.vendorId}</td>
  </tr>
);

VendorItem.propTypes = {
  vendor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vendorId: PropTypes.number.isRequired,
  }).isRequired,

};

export default VendorItem;
