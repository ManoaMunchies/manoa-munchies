import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import '../../../client/style.css';
import PropTypes from 'prop-types';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router';
import { Vendors } from '../../api/vendors/Vendors';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorItemAdmin from '../components/VendorItemAdmin';

const AdminPanel = ({ currentUser }) => {
  const navigate = useNavigate();

  // Destructure the username from currentUser
  const { username } = currentUser || {};
  const { ready, vendorData, userData, userRoles } = useTracker(() => {
    const subscriptionVendors = Meteor.subscribe('allVendorData');
    const subscriptionUsers = Meteor.subscribe('allUserData');
    const subscriptionRoles = Meteor.subscribe('allUsersRoles');

    return {
      ready: subscriptionVendors.ready() && subscriptionUsers.ready() && subscriptionRoles.ready(),
      vendorData: Vendors.collection.find({}).fetch(),
      userData: Meteor.users.find({}).fetch(),
      userRoles: Meteor.roleAssignment.find({}).fetch(),
    };
  }, []);

  const handleRoleChange = (userId, newRole) => {
    Meteor.call('users.updateRole', userId, newRole, (error) => {
      if (error) {
        // Handle error
        console.error('Error updating role:', error);
      } else {
        // Optionally, handle successful role update
        console.log('Role updated successfully');
      }
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      Meteor.call('users.remove', userId, (error) => {
        if (error) {
          // Handle error
          console.error('Error deleting user:', error);
        } else {
          // Optionally, handle successful deletion
          console.log('User deleted successfully');
        }
      });
    }
  };

  return (ready ? (
    <Container id="admin-panel" fluid className="py-3">
      <Row>
        <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="h1-landing">Admin Panel</h1>
          <p className="paragraph-landing">
            Welcome back, {username || 'Loading...'}.
          </p>
        </Col>
      </Row>
      <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
        <h2 className="h1-landing">Vendor Information</h2>
      </Col>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Hours</th>
            <th>Owner</th>
            <th>Edit Information</th>
            <th>Edit Menu</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vendorData.map((vendor) => <VendorItemAdmin key={vendor._id} vendors={vendor} />)}
        </tbody>
      </Table>
      <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
        <Button onClick={() => navigate('/add-vendors')}>Add New Vendor</Button>
      </Col>
      <Col className="background-row d-flex flex-column align-items-center justify-content-center text-center">
        <h2 className="h1-landing">Active Accounts</h2>
      </Col>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.emails && user.emails[0].address}</td>
              <td> {userRoles.filter(role => role.user._id === user._id).map(role => (
                <div key={role._id}>{role.role._id}</div>
              ))}
              </td>
              <td>
                {/* Dropdown or other UI element to select a new role */}
                <select onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                  <option value="">Select Role</option>
                  {/* List of possible roles */}
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="vendor">Vendor</option>
                </select>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner />);
};
AdminPanel.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};
// default propType for currentUser
AdminPanel.defaultProps = {
  currentUser: {
    username: 'Loading...',
  },
};

export default withTracker(() => ({ currentUser: Meteor.user() }))(AdminPanel);
