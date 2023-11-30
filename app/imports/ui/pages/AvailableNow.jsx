import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { Vendors } from '../../api/vendors/Vendors';
import { Foods } from '../../api/fooditems/Foods';
import LoadingSpinner from '../components/LoadingSpinner';
import AvailableCard from '../components/AvailableCard';

const AvailableNow = () => {
  const { ready, vendorData, foodData } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const adminSubscription = Meteor.subscribe(Vendors.adminPublicationName);
    const foodSubscription = Meteor.subscribe(Foods.userPublicationName);
    const adminFoodSubscription = Meteor.subscribe(Foods.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = (subscription.ready() || adminSubscription.ready()) && (foodSubscription.ready() || adminFoodSubscription.ready());
    // Get the Stuff documents
    const vendorItems = Vendors.collection.find({}).fetch();
    const foodItems = Foods.collection.find({}).fetch();
    return {
      vendorData: vendorItems,
      foodData: foodItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List of Vendors</h2>
          </Col>
          {vendorData.map((vendor) => {
            const availableFoods = foodData.filter((food) => food.vendor === vendor.name);
            return <AvailableCard key={vendor._id} vendors={vendor} availableFood={availableFoods} />;
          })}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AvailableNow;
