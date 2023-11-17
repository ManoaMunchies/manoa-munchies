import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const VendorAdmin = ({ vendor }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={vendor.image} width={75} />
      <Card.Title>{vendor.name}</Card.Title>
      <Card.Subtitle>{vendor.location}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{vendor.day}</Card.Text>
      <Card.Text>{vendor.time}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
VendorAdmin.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    day: PropTypes.string,
    time: PropTypes.string,
    // _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default VendorAdmin;
