import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Form, Card, Col, Container, Image, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserProfiles } from '../../api/userpreferences/UserProfiles';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const UserMyProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(UserProfiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = UserProfiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Profile</h2>
          </Col>
          <Row className="justify-content-center">
            <Col xs={3} className="justify-content-center">
              {profiles.map((profile) => (<Image className="rounded-circle mb-3" src={profile.image} width={150} />))}
            </Col>
            <Col xs={7}>
              <Card>
                <Card.Body>
                  <Form>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>First name</Form.Label>
                        {profiles.map((profile) => (<Form.Control type="text" name="firstName" value={profile.firstName} />))}
                      </Col>
                      <Col>
                        <Form.Label>Last name</Form.Label>
                        {profiles.map((profile) => (
                          <Form.Control type="text" name="lastName" value={profile.firstName} />
                        ))}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Title</Form.Label>
                        {profiles.map((profile) => (
                          <Form.Control type="text" name="title" value={profile.title} />
                        ))}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Instagram</Form.Label>
                        {profiles.map((profile) => (
                          <Form.Control type="text" name="instagram" value={profile.instagram} />
                        ))}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Bio</Form.Label>
                        {profiles.map((profile) => (
                          <Form.Control type="text" name="bio" value={profile.bio} />
                        ))}
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserMyProfile;
