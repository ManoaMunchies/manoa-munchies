import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { Maps } from '../../api/maps/Maps';
import LoadingSpinner from '../components/LoadingSpinner';
import Map from '../components/Map';
import '../../../client/styles/cards.css';

const MapPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorName = searchParams.get('vendor');
  const { ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('foodItemsByVendor', vendorName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Maps.collection.find({ vendor: vendorName }).fetch();
    return {
      mapitems: items,
      ready: rdy,
    };
  }, [vendorName]);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h1 className="h1-map">Map</h1>
          </Col>
          <Map location={location} zoomLevel={17} />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MapPage;
