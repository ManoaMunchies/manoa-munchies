import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';

// Create roles on startup
const roles = ['admin', 'user', 'vendor'];
roles.forEach(role => {
  Roles.createRole(role, { unlessExists: true });
});

// Create default users
if (Meteor.users.find().count() === 0 && Meteor.settings.defaultAccounts) {
  console.log('Creating the default user(s)');
  Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => {
    const userID = Accounts.createUser({
      username: email,
      email: email,
      password: password,
    });
    if (roles.includes(role)) {
      Roles.addUsersToRoles(userID, role);
    }
  });
} else {
  console.log('Default users already exist or settings are not provided.');
}

Meteor.methods({
  'assignUserRole'(userId, role) {
    // Security check to prevent unauthorized role assignment
    check(role, String);
    check(userId, String);
    if (['admin', 'user', 'vendor'].includes(role)) {
      Roles.addUsersToRoles(userId, role);
    } else {
      throw new Meteor.Error('invalid-role', 'Invalid role specified');
    }
  },
});
