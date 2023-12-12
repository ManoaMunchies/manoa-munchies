import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link

const AvailableCard = ({ vendors, availableFood }) => (
  <Card className="food-card">
    <Card.Header>
      <Card.Title>{vendors.name}</Card.Title>
      <Card.Subtitle>{vendors.location}</Card.Subtitle>
      <Card.Text>{vendors.hours}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text className="fw-bold">Available Food</Card.Text>
      <ListGroup variant="flush">
        {availableFood.map((food, idx) => {
          if (idx > 2) {
            return null;
          }
          return <ListGroup.Item key={food._id}>{food.name}</ListGroup.Item>;
        })}
      </ListGroup>
      <Link to={`/menu?vendor=${encodeURIComponent(vendors.name)}`}>See Full Menu</Link> {/* Use Link */}
      <br />
      <Link to={`/map/${encodeURIComponent(vendors.name)}`}>See Location on Map</Link> {/* Use Link */}
    </Card.Body>
  </Card>
);

AvailableCard.propTypes = {
  vendors: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
  }).isRequired,
  availableFood: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    cuisineType: PropTypes.string,
    vendor: PropTypes.string,
    availability: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default AvailableCard;
