import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import '../../../client/style.css';
import PropTypes from 'prop-types';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Foods } from '../../api/fooditems/Foods';
import { Vendors } from '../../api/vendors/Vendors';
import LoadingSpinner from '../components/LoadingSpinner';
import FoodItemsAdmin from '../components/FoodItemsAdmin';
import VendorItemVendor from '../components/VendorItemVendor';

const VendorHome = ({ currentUser }) => {
  // Destructure the username from currentUser
  const { username } = currentUser || {};
  const { ready, vendorData, foodItems } = useTracker(() => {
    const subscriptionVendors = Meteor.subscribe('myVendorData');
    const subscriptionFoods = Meteor.subscribe('myFoodData');

    return {
      ready: subscriptionVendors.ready() && subscriptionFoods.ready(),
      vendorData: Vendors.collection.find({}).fetch(),
      foodItems: Foods.collection.find({}).fetch(),
    };
  }, []);

  return (ready ? (
    <Container id="vendor-home" fluid className="py-3">
      <Row>
        <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="h1-landing">Vendor Home Page</h1>
          <p className="paragraph-landing">
            Welcome back, {username || 'Loading...'}.
          </p>
        </Col>
      </Row>
      <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
        <h2 className="h1-landing">Your Vendor Information</h2>
      </Col>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Hours</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {vendorData.map((vendor) => <VendorItemVendor key={vendor._id} vendors={vendor} />)}
        </tbody>
      </Table>
      <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
        <h2 className="h1-landing">Your Menu</h2>
      </Col>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cuisine Type</th>
            <th>Vendor</th>
            <th>Availability</th>
            <th>Owner</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((fooditem) => <FoodItemsAdmin key={fooditem._id} fooditems={fooditem} />)}
        </tbody>
      </Table>
      <Row className="justify-content-center mt-3">
        <Col md="auto">
          <Button as="a" href="/add-food-items" className="vendor-btn-edit">Add Menu Item</Button>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
VendorHome.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string, // Assuming username is a string
  }),
};
// default propType for currentUser
VendorHome.defaultProps = {
  currentUser: {
    username: 'Loading...',
  },
};
export default withTracker(() => ({ currentUser: Meteor.user() }))(VendorHome);
