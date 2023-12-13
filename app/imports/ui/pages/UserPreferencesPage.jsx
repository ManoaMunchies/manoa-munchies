import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, BoolField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserPreferences } from '../../api/userpreferences/UserPreferences';

const bridge = new SimpleSchema2Bridge(UserPreferences.schema);
// const navigate = useNavigate();
/* Renders the EditStuff page for editing a single document. */
const UserPreferencesPage = () => {
  // console.log(Meteor.user());
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe('myUserPreferences');
    const rdy = subscription.ready();
    const document = UserPreferences.collection.findOne({ owner: Meteor.user()?.username });
    return {
      doc: document || { owner: Meteor.user()?.username }, // Provide a default document if not found
      ready: rdy,
    };
  }, []);

  const submit = (data) => {
    console.log(Meteor.userId());
    // No need to set 'owner' manually as it's included in 'data' from the form
    UserPreferences.collection.update(doc._id, { $set: data }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Preferences updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Your Preferences</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card className="food-card">
              <Card.Body>
                <Col><h5>Cuisine Preferences</h5>
                  <BoolField name="cuisinePreferences.isBreakfast" label="Breakfast" />
                  <BoolField name="cuisinePreferences.isAmerican" label="American" />
                  <BoolField name="cuisinePreferences.isHawaiian" label="Hawaiian" />
                  <BoolField name="cuisinePreferences.isChinese" label="Chinese" />
                  <BoolField name="cuisinePreferences.isJapanese" label="Japanese" />
                  <BoolField name="cuisinePreferences.isKorean" label="Korean" />
                  <BoolField name="cuisinePreferences.isThai" label="Thai" />
                  <BoolField name="cuisinePreferences.isIndian" label="Indian" />
                  <BoolField name="cuisinePreferences.isMexican" label="Mexican" />
                </Col>
                <Col><h5>Dietary Restrictions</h5>
                  <BoolField name="dietRestrictions.isVegan" label="Vegan" />
                  <BoolField name="dietRestrictions.isVegetarian" label="Vegetarian" />
                  <BoolField name="dietRestrictions.isGlutenFree" label="Gluten-Free" />
                  <BoolField name="dietRestrictions.isDairyFree" label="Dairy-Free" />
                  <BoolField name="dietRestrictions.isNutFree" label="Nut-Free" />
                </Col>
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserPreferencesPage;
