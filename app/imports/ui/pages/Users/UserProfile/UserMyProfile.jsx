import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Form, Card, Col, Container, Image, Row, Alert } from 'react-bootstrap';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { UserProfiles } from '../../../../api/userpreferences/UserProfiles';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */

const UserMyProfile = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profile } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(UserProfiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userProfile = UserProfiles.collection.findOne({ owner: Meteor.user().username });
    return {
      profile: userProfile,
      ready: rdy,
    };
  }, []);
  useEffect(() => {
    if (profile) {
      setFormData({ ...profile });
    }
  }, [profile]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = () => {
    Meteor.call('userProfiles.update', formData, (error) => {
      if (!error) {
        setEditing(false);
        setUpdateSuccess(true); // Set update success state to true
        setTimeout(() => {
          setUpdateSuccess(false); // Reset update success state after a delay
        }, 3000);
      }
    });
  };
  if (!ready) {
    return <div>Loading...</div>;
  }

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Profile</h2>
          </Col>
          {updateSuccess && ( // Display success message if updateSuccess is true
            <Alert variant="success">
              Profile updated successfully.
            </Alert>
          )}
          {profile ? (
            <Row className="justify-content-center">
              <Col xs={10} md={4} lg={4} className="justify-content-center">
                <Image className="rounded-circle mb-3" src={formData.image} width={300} />
              </Col>
              <Col xs={10} md={6} lg={6}>
                <Card>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group className="py-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              className="py-3"
                              type="Email"
                              name="owner"
                              value={formData.owner || ''}
                              disabled={!editing || editing}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="py-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              className="py-3"
                              type="text"
                              name="firstName"
                              value={formData.firstName || ''}
                              disabled={!editing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="py-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              className="py-3"
                              type="text"
                              name="lastName"
                              value={formData.lastName || ''}
                              disabled={!editing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="py-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                              className="py-3"
                              type="text"
                              name="image"
                              value={formData.image || ''}
                              disabled={!editing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="py-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              className="py-3"
                              type="text"
                              name="title"
                              value={formData.title || ''}
                              disabled={!editing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="py-3">
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control
                              className="py-3"
                              type="text"
                              name="instagram"
                              value={formData.instagram || ''}
                              disabled={!editing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="py-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                              className="py-3"
                              type="text"
                              name="bio"
                              value={formData.bio || ''}
                              disabled={!editing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {!editing && (
                            <Button className="mt-3 py-3" variant="primary" onClick={handleEditClick}>
                              Edit Profile
                            </Button>
                          )}

                          {editing && (
                            <Button className="mt-3 py-3" variant="success" onClick={handleSaveClick}>
                              Save Profile
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <div>No profile found.</div>
          )}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserMyProfile;
