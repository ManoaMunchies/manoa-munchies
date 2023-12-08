import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const ReviewItem = ({ review }) => (
  <Card className="food-card col-md-6">
    <Card.Header>
      <Card.Title>{review.reviewerName}</Card.Title>
      <Card.Subtitle>Stars: {review.stars}/5</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text className="fw-bold">{review.reviewText}</Card.Text>
    </Card.Body>
  </Card>
);

ReviewItem.propTypes = {
  review: PropTypes.shape({
    reviewText: String,
    reviewerName: String,
    vendor: String,
    stars: Number,
    createdAt: Date,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReviewItem;
