import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { useLocation } from 'react-router-dom';
import { Reviews } from '../../api/reviews/Reviews';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  reviewerName: {
    type: String,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  owner: {
    type: String,
    required: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddReview page for adding a document. */
const AddReview = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorName = searchParams.get('vendor');
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { reviewerName, reviewText, stars, owner } = data;
    Reviews.collection.insert(
      { reviewerName, vendorName, reviewText, stars, owner },
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
          <Col className="text-center"><h2>Add Review for {vendorName}</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="reviewerName" placeholder={Meteor.user().username} />
                <TextField name="reviewText" />
                <NumField name="stars" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="vendorName" value={vendorName} />
                <HiddenField name="owner" value={Meteor.userId()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddReview;
