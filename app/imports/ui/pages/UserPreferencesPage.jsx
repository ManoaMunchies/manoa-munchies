import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useTracker } from 'meteor/react-meteor-data';
import Card from 'react-bootstrap/Card';
import { UserPreferences } from '../../api/userpreferences/UserPreferences';
import LoadingSpinner from '../components/LoadingSpinner';

const UserPreferencesPage = () => {
  const { ready, userPreferences } = useTracker(() => {
    const userPreferencesSubscription = Meteor.subscribe(UserPreferences.userPublicationName);
    const rdy = userPreferencesSubscription.ready();
    const preferences = UserPreferences.collection.find({}).fetch();
    return {
      ready: rdy,
      userPreferences: preferences,
    };
  }, []);

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const cuisineOptions = ['american', 'hawaiian', 'chinese', 'japanese', 'korean', 'thai', 'indian', 'mexican'];
  const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'];

  const handleCheckboxChange = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(item => item !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };
  const handleCheckboxChangeDietary = (dietary) => {
    if (selectedDietary.includes(dietary)) {
      setSelectedDietary(selectedDietary.filter(item => item !== dietary));
    } else {
      setSelectedDietary([...selectedDietary, dietary]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with selected cuisines:', selectedCuisines);

    // Assuming 'userPreferences.update' is the correct method name
    Meteor.call('userPreferences.update', Meteor.userId(), { cuisinePreferences: selectedCuisines, dietRestrictions: selectedDietary }, (error) => {
      if (error) {
        console.error('Error updating preferences:', error);
        setShowConfirmation(false);
      } else {
        console.log('Preferences updated successfully');
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 3000);
      }
    });
  };

  return (ready ? (
    <Container>
      <h2 className="h1-food-card">Your Preferences</h2>
      <Card className="food-card">
        <Card.Body>
          <Card.Header>
            <p>Preferences are used to determine which food items are displayed on your available now page.</p>
          </Card.Header>
          <Card.Body>Cuisine Preferences: {userPreferences[0].cuisinePreferences.join(', ')}
            <br /> Dietary Preferences: {userPreferences[0].dietRestrictions.join(', ')}
          </Card.Body>
        </Card.Body>
      </Card>
      <h2 className="h1-food-card">Edit Your Preferences</h2>
      <Card className="food-card">
        <Col>
          <Form className="card-form" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label><h3>Cuisine Preferences</h3></Form.Label>
              <Row>
                {cuisineOptions.map(cuisine => (
                  <Col xs={12} md={4} key={cuisine}>
                    <Form.Check
                      type="checkbox"
                      id={cuisine}
                      label={cuisine}
                      value={cuisine}
                      onChange={() => handleCheckboxChange(cuisine)}
                      checked={selectedCuisines.includes(cuisine)}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
            {/* <Button className="preferences-button" type="submit">Save Preferences</Button> */}
            {/* {showConfirmation && ( */}
            {/*  <Alert variant="success">Your preferences have been updated successfully!</Alert> */}
            {/* )} */}
          </Form>
        </Col>
        <Col>
          <Form className="card-form" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label><h3>Dietary Preferences</h3></Form.Label>
              <Row>
                {dietaryOptions.map(dietary => (
                  <Col xs={12} md={4} key={dietary}>
                    <Form.Check
                      type="checkbox"
                      id={dietary}
                      label={dietary}
                      value={dietary}
                      onChange={() => handleCheckboxChangeDietary(dietary)}
                      checked={selectedDietary.includes(dietary)}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
            <Button className="preferences-button" type="submit">Save Preferences</Button>
            {showConfirmation && (
              <Alert variant="success">Your preferences have been updated successfully!</Alert>
            )}
          </Form>
        </Col>
      </Card>
    </Container>
  ) : <LoadingSpinner />);

};

export default UserPreferencesPage;
