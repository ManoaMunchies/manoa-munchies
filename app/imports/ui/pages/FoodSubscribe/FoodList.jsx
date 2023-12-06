import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import { Foods } from '../../../api/fooditems/Foods';
import MarkFoodReady from './MarkFoodReady';
import LoadingSpinner from '../../components/LoadingSpinner';

const FoodList = () => {
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
      <div>
        <h1>Food List</h1>
        {fooditems.map((food) => (
          <MarkFoodReady key={food._id} food={food} />
        ))}
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default FoodList;
