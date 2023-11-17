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
            {currentUser ? ([
              <Nav.Link id="available-now-nav" as={NavLink} to="/available-now" key="available-now">Foods available right now</Nav.Link>,
              <Nav.Link id="top-picks-nav" as={NavLink} to="/top-picks" key="top-picks">Today’s top picks</Nav.Link>,
              <Nav.Link id="my-profile-nav" as={NavLink} to="/my-profile" key="my-profile">My profile</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">List Menu</Nav.Link>,
              <Nav.Link id="add-vendor-admin-nav" as={NavLink} to="/addvendor" key="addvendor">Add Menu</Nav.Link>,
              <Nav.Link id="add-vendor-admin-nav" as={NavLink} to="/addvendor" key="addvendor">Edit Menu</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">List Vendor</Nav.Link>,
              <Nav.Link id="add-vendor-admin-nav" as={NavLink} to="/addvendor" key="addvendor">Add Vendor</Nav.Link>,
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
