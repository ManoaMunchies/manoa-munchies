import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Form, Card, Col, Container, Row, Alert, ProgressBar } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import { UserProfiles } from '../../../api/userpreferences/UserProfiles';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */

const UserMyProfile2 = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [uploadProgress, setUploadProgress] = useState(0);
  // const [uploadProgress, setUploadProgress] = useState(0); // state variable uploadProgress to hold the upload progress percentage

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

  const handleFileChange = (event) => {
    const _file = event.target.files[0];
    setFile(_file);
  };
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = () => {
    if (file) {
      const _formData = new FormData();
      _formData.append('avatar', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload-avatar');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          const { path } = JSON.parse(xhr.responseText);

          // Save the avatar path in the UserProfiles collection
          UserProfiles.collection.update({ owner: Meteor.user().username }, { $set: { img: path } });

          // Perform any other necessary operations
        }
      };

      xhr.send(_formData);

    } else {
      Meteor.call('userProfiles.update', formData, (error) => {
        if (!error) {
          setEditing(false);
          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
          }, 3000);
        }
      });
    }
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
              <Col xs={3} className="justify-content-center">
                <Form.Group>
                  <img src={profile.avatar || '/images/defaultImage.png'} alt="Avatar" width="200" height="200" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    accept="image/*"
                    disabled={!editing}
                    onChange={handleFileChange}
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                  )}
                </Form.Group>
              </Col>
              <Col xs={7}>
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

export default UserMyProfile2;
