import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Foods } from '../../api/fooditems/Foods';
import FoodItemsAdmin from '../components/FoodItemsAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const MenuAdmin = () => {
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
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>{ vendorName } Menu (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Cuisine Type</th>
                <th>Vendor</th>
                <th>Availability</th>
                <th>Owner</th>
                <th>Top Pick</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {fooditems.map((fooditem) => <FoodItemsAdmin key={fooditem._id} fooditems={fooditem} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md="auto">
          <Button as="a" href="/add-food-items" className="vendor-btn-edit">Add Menu Item</Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md="auto">
          <Button as="a" href="/admin-panel" className="vendor-btn-edit">Back</Button>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MenuAdmin;
