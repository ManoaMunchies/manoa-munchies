import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vendors } from '../../api/vendors/Vendors';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  location: {
    type: String,
    allowedValues: ['Paradise Palms Café', 'Food Truck Row', 'Shidler College', 'Campus Center', 'Hemenway', 'Gateway House', 'Athletic Complex', 'Hale Aloha', 'Hale Noelani'],
    defaultValue: 'Campus Center',
  },
  hours: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddVendors page for adding a vendor. */
const AddVendors = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, location, hours } = data;
    const owner = Meteor.user().username;
    Vendors.collection.insert(
      { name, location, hours, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');

        } else {
          swal('Success', 'Vendor added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Col className="text-center"><h2>Add Vendor</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <SelectField name="location" />
                <TextField name="hours" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddVendors;
