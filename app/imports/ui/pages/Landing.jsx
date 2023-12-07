import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../../../client/style.css';

const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row>
      <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
        <h1 className="h1-landing">Welcome to Aloha Eats</h1>
        <p className="paragraph-landing">Your campus food guide at UH Manoa.</p>
        <p className="paragraph-landing">Discover and enjoy diverse culinary options right at your fingertips!</p>
      </Col>
    </Row>
    <Row className="my-4">
      <Col className="background-row2 d-flex flex-column align-items-center justify-content-center text-center">
        <h2 className="h2-landing">Why Aloha Eats?</h2>
        <p className="paragraph-landing">Find your favorite foods on campus easily, get notified about daily specials, and explore new tastes every day!</p>
      </Col>
    </Row>
    <Row className="background-row3 mb-4">
      <Col md={6} className="d-flex flex-column align-items-center justify-content-center text-center">
        <p className="paragraph-landing">New to Aloha Eats?</p>
        <Button as="a" href="/signup" className="btn-primary">Sign Up</Button>
      </Col>
      <Col md={6} className="d-flex flex-column align-items-center justify-content-center text-center">
        <p className="paragraph-landing">Already exploring with us?</p>
        <Button as="a" href="/signin" className="btn-primary">Sign in</Button>
      </Col>
    </Row>
  </Container>
);

export default Landing;
