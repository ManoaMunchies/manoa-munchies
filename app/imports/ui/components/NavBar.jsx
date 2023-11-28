import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2>Aloha Eats</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link id="available-now-nav" as={NavLink} to="/available-now" key="available-now">Foods available right now</Nav.Link>,
            <Nav.Link id="top-picks-nav" as={NavLink} to="/top-picks" key="top-picks">Today’s top picks</Nav.Link>,
            {currentUser ? ([
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
              <Nav.Link id="vendor-nav" as={NavLink} to="/vendors" key="vendors">Vendors</Nav.Link>,
              <Nav.Link id="food-items-nav" as={NavLink} to="/food-items" key="food-items">Food Items</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
              <Nav.Link id="vendor-home-nav" as={NavLink} to="/vendorhome" key="vendorhome">Vendor Home</Nav.Link>,
              <Nav.Link id="add-food-items-nav" as={NavLink} to="/add-food-items" key="add-food-items">Add Food Items</Nav.Link>,
              <Nav.Link id="vendors-vendor-nav" as={NavLink} to="/vendors-vendor" key="vendors-vendor">Vendors</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="admin-panel-nav" as={NavLink} to="/admin-panel" key="admin">Admin Panel</Nav.Link>,
              // <Nav.Link id="add-food-items-nav" as={NavLink} to="/add-food-items" key="add-food-items">Add Food Items</Nav.Link>,
              // <Nav.Link id="add-vendors-nav" as={NavLink} to="/add-vendors" key="add-vendors">Add Vendors</Nav.Link>,
              // <Nav.Link id="list-vendors-admin-nav" as={NavLink} to="/vendors-admin" key="vendors-admin">Vendors Admin</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
