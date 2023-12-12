import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
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

  const [location, setLocation] = useState(null);

  const { vendorName } = useParams();

  useEffect(() => {
    if (vendorData.length > 0) {
      // eslint-disable-next-line no-shadow
      const vendor = vendorData.find(vendor => vendor.name === decodeURIComponent(vendorName));
      if (vendor && vendor.mapLocation) {
        setLocation(vendor.mapLocation);
      }
    }
  }, [vendorData, vendorName]);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h1 className="h1-map">Map</h1>
          </Col>
          {location && <Map location={location} zoomLevel={18} />}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MapPage;
