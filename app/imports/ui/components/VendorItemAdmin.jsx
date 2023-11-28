import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const VendorItemAdmin = ({ vendors }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = (vendorId) => {
    setItemToDelete(vendorId);
    setShowConfirm(true); // Show the confirmation dialog
  };

  const confirmDelete = () => {
    // Call Meteor method with the item ID to delete
    Meteor.call('vendors.remove', itemToDelete, (error) => {
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
  return (
    <>
      <tr>
        <td>{vendors.name}</td>
        <td>{vendors.location}</td>
        <td>{vendors.hours}</td>
        <td>{vendors.owner}</td>
        <td>
          <Link to={`/edit-vendor-item-admin/${vendors._id}`} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <Link to={`/edit-vendor-menu-admin?vendor=${encodeURIComponent(vendors.name)}`} className="btn btn-primary">Edit Menu</Link>
        </td>
        <td><Button variant="danger" onClick={() => handleDelete(vendors._id)}>Delete</Button></td>
      </tr>
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this vendor?</p>
          <Button onClick={confirmDelete}>Yes</Button>
          <Button onClick={cancelDelete}>No</Button>
        </div>
      )}
    </>
  );
};

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
