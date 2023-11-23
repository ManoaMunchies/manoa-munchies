import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../../../client/style.css';

const VendorHome = () => (
  <Container id="vendor-home" fluid className="py-3">
    <Row>
      <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
        <h1 className="h1-landing">Vendor Home Page</h1>
        <p className="paragraph-landing">Welcome back, insertvendornamehere.</p>
      </Col>
    </Row>
  </Container>
);

export default VendorHome;
