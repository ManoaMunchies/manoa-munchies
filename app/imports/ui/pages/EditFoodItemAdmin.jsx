import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, BoolField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Foods } from '../../api/fooditems/Foods';

const bridge = new SimpleSchema2Bridge(Foods.schema);
// const navigate = useNavigate();
/* Renders the EditStuff page for editing a single document. */
const EditFoodItemAdmin = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Foods.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Foods.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, quantity, cuisineType, vendor, availability, topPick, dietOptions } = data;
    Foods.collection.update(_id, { $set: { name, quantity, cuisineType, vendor, availability, topPick, dietOptions } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Menu Item (Admin)</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <NumField name="quantity" decimal={null} />
                <SelectField name="cuisineType" />
                <TextField name="vendor" />
                <SelectField name="availability" />
                <BoolField name="dietOptions.isVegan" label="Vegan" />
                <BoolField name="dietOptions.isVegetarian" label="Vegetarian" />
                <BoolField name="dietOptions.isGlutenFree" label="Gluten-Free" />
                <BoolField name="dietOptions.isDairyFree" label="Dairy-Free" />
                <BoolField name="dietOptions.isNutFree" label="Nut-Free" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md="auto">
          <Button as="a" href="/admin-panel" className="vendor-btn-edit">Back</Button>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditFoodItemAdmin;
