import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const Profile = ({ profile }) => (
  <Row>
    <Col xs={4}>
      <Image src={profile.image} width={75} />
    </Col>
    <Col xs={6}>
      <Card className="h-100">
        <Card.Header>
          <Card.Title>Profile</Card.Title>
          <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
          <Card.Subtitle>{profile.title}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>{profile.instagram}</Card.Text>
          <Card.Text>{profile.bio}</Card.Text>
          <footer className="blockquote-footer">{profile.owner}</footer>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    instagram: PropTypes.string,
    bio: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default Profile;
