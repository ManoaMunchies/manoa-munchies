import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../../client/style.css';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const VendorHome = ({ currentUser }) => {
  // Destructure the username from currentUser
  const { username } = currentUser || {};

  return (
    <Container id="vendor-home" fluid className="py-3">
      <Row>
        <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="h1-landing">Vendor Home Page</h1>
          <p className="paragraph-landing">
            Welcome back, {username || 'Loading...'}.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
VendorHome.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string, // Assuming username is a string
  }),
};
VendorHome.defaultProps = {
  currentUser: null,
};
export default withTracker(() => ({
  currentUser: Meteor.user(),
}))(VendorHome);
