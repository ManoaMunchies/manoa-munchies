import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Foods } from '../../api/fooditems/Foods';
import FoodItems from '../components/FoodItems';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListFoodItems = () => {
  const [filter, setFilter] = useState(''); // State to keep track of the selected filter
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { fooditems, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Foods.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Foods.collection.find({}).fetch();
    return {
      fooditems: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h1 className="h1-food-card">Food Items</h1>
            <select className="mb-3" onChange={e => setFilter(e.target.value)}>
              <option value="">All Cuisines</option>
              {/* Populate options with all available cuisine types */}
              {fooditems.map(fooditem => fooditem.cuisineType).filter((value, index, self) => self.indexOf(value) === index).map(cuisineType => <option key={cuisineType} value={cuisineType}>{cuisineType}</option>)}
              {/* Add more options as needed */}
            </select>
          </Col>
        </Col>
        <Row xs={1} md={2} lg={3} className="g-4">
          {fooditems
            .filter(fooditem => filter === '' || fooditem.cuisineType === filter)
            .map(fooditem => <FoodItems key={fooditem._id} fooditems={fooditem} />)}
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListFoodItems;
