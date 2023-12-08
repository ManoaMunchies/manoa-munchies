import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../../../../../../client/style.css';
import PropTypes from 'prop-types';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Foods } from '../../../../../api/fooditems/Foods';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import FoodItemsVendor from '../../../../components/Vendors/FoodItemsVendor';

const VendorMenu = ({ currentUser }) => {
  // Destructure the username from currentUser
  const { username } = currentUser || {};
  const { ready, foodItems } = useTracker(() => {
    const subscriptionFoods = Meteor.subscribe('myFoodData');

    return {
      ready: subscriptionFoods.ready(),
      foodItems: Foods.collection.find({}).fetch(),
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row>
        <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="h1-landing">Menu Management</h1>
          <p className="paragraph-landing">
            Welcome back, {username || 'Loading...'}.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-right py-3">
        <Col md="auto">
          <Button as="a" href="/add-food-items" className="vendor-btn-edit">Add Menu Item</Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {foodItems.map((fooditem) => <FoodItemsVendor key={fooditem._id} fooditems={fooditem} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

VendorMenu.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string, // Assuming username is a string
  }),
};
// default propType for currentUser
VendorMenu.defaultProps = {
  currentUser: {
    username: 'Loading...',
  },
};

export default withTracker(() => ({ currentUser: Meteor.user() }))(VendorMenu);
