import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendors } from '../../api/vendor/Vendors';
import VendorAdmin from '../components/VendorAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListVendorsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendors } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorItems = Vendors.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Vendor</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {vendors.map((vendor) => (<Col key={vendor._id}><VendorAdmin vendor={vendor} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListVendorsAdmin;
