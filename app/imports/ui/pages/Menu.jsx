import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Foods } from '../../api/fooditems/Foods';
import FoodItems from '../components/FoodItems';
// import FoodItemsVendor from '../components/Vendors/FoodItemsVendor';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const Menu = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorName = searchParams.get('vendor');
  const { fooditems, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('foodItemsByVendor', vendorName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Foods.collection.find({ vendor: vendorName }).fetch();
    return {
      fooditems: items,
      ready: rdy,
    };
  }, [vendorName]);
  return (ready ? (
    <Container className="py-3">
      <Col className="h1-food-card"><h2>{ vendorName } Menu</h2></Col>
      <Row xs={1} md={2} lg={3} className="g-4">
        {fooditems.map((fooditem) => <FoodItems key={fooditem._id} fooditems={fooditem} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Menu;
