import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Foods } from '../../api/fooditems/Foods';
import FoodItems from '../components/FoodItems';
import { UserPreferences } from '../../api/userpreferences/UserPreferences';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListFoodItemsFiltered = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { fooditems, userprefs, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const foodSub = Meteor.subscribe(Foods.userPublicationName);
    const userSub = Meteor.subscribe('myUserPreferences');
    // Determine if the subscription is ready
    const rdy = foodSub.ready() && userSub.ready();
    // Get the Stuff documents
    const foods = Foods.collection.find({}).fetch();
    const prefs = UserPreferences.collection.findOne({ owner: Meteor.user()?.username });
    return {
      fooditems: foods,
      userprefs: prefs,
      ready: rdy,
    };
  }, []);

  const filterFoodItems = (foods, prefs) => {
    // Check if any preferences are set to true
    const hasPreferencesSet = prefs && (
      Object.values(prefs.cuisinePreferences || {}).some(value => value) ||
      Object.values(prefs.dietRestrictions || {}).some(value => value)
    );

    return foods.filter(foodItem => {
      if (!hasPreferencesSet) {
        // If no preferences are set, include all food items
        return true;
      }
      // Check cuisine preferences
      const cuisineTypeKey = `is${foodItem.cuisineType.charAt(0).toUpperCase() + foodItem.cuisineType.slice(1)}`;
      const matchesCuisine = prefs.cuisinePreferences && prefs.cuisinePreferences[cuisineTypeKey];

      // Check dietary restrictions
      const matchesDiet = Object.entries(prefs.dietRestrictions || {}).some(
        ([dietKey, value]) => value && foodItem.dietOptions && foodItem.dietOptions[dietKey],
      );

      return matchesCuisine || matchesDiet;

    });
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <h1 className="text-center">Food Items by Your Preferences</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Cuisine Type</th>
                <th>Vendor</th>
                <th>Diet</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {filterFoodItems(fooditems, userprefs).map(fooditem => (
                <FoodItems key={fooditem._id} fooditems={fooditem} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListFoodItemsFiltered;
