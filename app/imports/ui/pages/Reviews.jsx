import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Reviews } from '../../api/reviews/Reviews';
import ReviewItem from '../components/ReviewItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListReviews = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorName = searchParams.get('vendor');
  const { reviews, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('reviewsByVendor', vendorName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    // const items = Reviews.collection.find({ vendor: vendorName }).fetch();
    const items = Reviews.collection.find().fetch();
    return {
      reviews: items,
      ready: rdy,
    };
  }, [vendorName]);
  return (ready ? (
    <Container className="py-3">
      <Col className="justify-content-center">
        <Row className="h1-food-card"><h2>{ vendorName } Reviews</h2></Row>
        <Row className="text-center">
          <Link to={`/add-review?vendor=${encodeURIComponent(vendorName)}`}>Add Review</Link>
        </Row>
        {reviews.map((review) => (
          <Row className="justify-content-center">
            <ReviewItem review={review} />
          </Row>
        ))}
      </Col>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListReviews;
