import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Foods } from '../../../../../api/fooditems/Foods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  image: String,
  description: String,
  cuisineType: {
    type: String,
    allowedValues: ['breakfast', 'american', 'hawaiian', 'chinese', 'japanese', 'korean', 'thai', 'indian', 'mexican'],
  },
  vendor: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    allowedValues: ['available', 'unavailable'],
    defaultValue: 'available',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddFoodItems = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, quantity, image, description, cuisineType, vendor, availability } = data;
    const owner = Meteor.user().username;
    Foods.collection.insert(
      { name, quantity, image, description, cuisineType, vendor, availability, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Food item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Menu Item</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <NumField name="quantity" decimal={null} />
                <TextField name="image" />
                <SelectField name="cuisineType" />
                <TextField name="vendor" />
                <TextField name="description" />
                <SelectField name="availability" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md="auto">
          <Button as="a" href="/vendormenu" className="vendor-btn-edit">Back</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFoodItems;
