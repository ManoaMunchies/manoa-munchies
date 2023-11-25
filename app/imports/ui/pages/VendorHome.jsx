import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import '../../../client/style.css';
import PropTypes from 'prop-types';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Foods } from '../../api/fooditems/Foods';
import { Vendors } from '../../api/vendors/Vendors';
import VendorItem from '../components/VendorItem';
import LoadingSpinner from '../components/LoadingSpinner';
import FoodItemsAdmin from '../components/FoodItemsAdmin';

const VendorHome = ({ currentUser }) => {
  // Destructure the username from currentUser
  const { username } = currentUser || {};
  const { ready, vendors, fooditems } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscriptionVendors = Meteor.subscribe(Vendors.vendorPublicationName);
    const subscriptionFoods = Meteor.subscribe(Foods.vendorPublicationName);
    // Determine if the subscription is ready
    const rdy = subscriptionVendors.ready();
    const rdyy = subscriptionFoods.ready();
    // Get the Stuff documents
    const vendorItems = Vendors.collection.find({}).fetch();
    const items = Foods.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      fooditems: items,
      ready: rdy, rdyy,
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
            <th>Vendor ID</th>
            <th>Location</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => <VendorItem key={vendor._id} vendor={vendor} />)}
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
            <th>Vendor ID</th>
            <th>Cuisine Type</th>
            <th>Availability</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {fooditems.map((fooditem) => <FoodItemsAdmin key={fooditem._id} fooditems={fooditem} />)}
        </tbody>
      </Table>
      {/* Button placed outside tbody but within Container */}
      <Row className="justify-content-center mt-3">
        <Col md="auto">
          <Button as="a" href="/edit-vendor" className="vendor-btn-edit">Edit Information</Button>
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
