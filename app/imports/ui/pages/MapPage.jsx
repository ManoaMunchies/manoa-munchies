import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Map from '../components/Map';
import '../../../client/styles/cards.css';
import '../../../client/styles/map.css';
import { Vendors } from '../../api/vendors/Vendors';

const MapPage = () => {
  const { ready, vendorData } = useTracker(() => {
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const adminSubscription = Meteor.subscribe(Vendors.adminPublicationName);
    const vendorVendorSubscription = Meteor.subscribe(Vendors.vendorPublicationName);
    const rdy = (subscription.ready() || adminSubscription.ready()) && vendorVendorSubscription.ready();
    const vendorItems = Vendors.collection.find({}).fetch();
    return {
      vendorData: vendorItems,
      ready: rdy,
    };
  }, []);

  const [location, setLocation] = useState(null); // Define setLocation using useState

  useEffect(() => {
    if (vendorData.length > 0 && vendorData[0].mapLocation) {
      setLocation(vendorData[0].mapLocation);
    }
  }, [vendorData]);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h1 className="h1-map">Map</h1>
          </Col>
          {location && <Map location={location} zoomLevel={17} />}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MapPage;
