import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { Vendors } from '../../api/vendors/Vendors';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorItemAdmin from '../components/VendorItem';

const ListVendorsAdmin = () => {
  const { ready, vendors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
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
        <Col md={8}>
          <Col className="text-center">
            <h2>List of Vendors</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Vendor ID</th>
                <th>Location</th>
                <th>Hours</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => <VendorItemAdmin key={vendor._id} vendor={vendor} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListVendorsAdmin;