import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import AddFoodItems from '../pages/Vendors/FoodItems/Function/AddFoodItems';
import ListFoodItemsFiltered from '../pages/ListFoodItemsFiltered';
import Menu from '../pages/Menu';
import AvailableNow from '../pages/AvailableNow';
import AddReview from '../pages/AddReview';
import Reviews from '../pages/Reviews';
import VendorMenu from '../pages/Vendors/FoodItems/Listing/VendorMenu';
import VendorHome from '../pages/Vendors/FoodItems/Listing/VendorHome';
import UserMyProfile from '../pages/Users/UserProfile/UserMyProfile';
import { UserPreferences } from '../../api/userpreferences/UserPreferences';
import UserPreferencesPage from '../pages/UserPreferencesPage';
import EditFoodItem from '../pages/Vendors/FoodItems/Function/EditFoodItem';
import EditFoodItemAdmin from '../pages/EditFoodItemAdmin';
import EditVendorItem from '../pages/Vendors/EditVendorItem';
import ListFoodItemsAdmin from '../pages/ListFoodItemsAdmin';
import AdminPanel from '../pages/AdminPanel';
import ListVendors from '../pages/ListVendors';
import ListVendorsVendor from '../pages/ListVendorsVendor';
import ListVendorsAdmin from '../pages/ListVendorsAdmin';
import EditVendorItemAdmin from '../pages/EditVendorItemAdmin';
import MenuAdmin from '../pages/MenuAdmin';
import AddVendors from '../pages/AddVendors';
import TopPicks from '../pages/TopPicks';
import MapPage from '../pages/MapPage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/add-food-items" element={<ProtectedRoute><AddFoodItems /></ProtectedRoute>} />
          <Route path="/food-items-filtered" element={<ProtectedRoute><ListFoodItemsFiltered /></ProtectedRoute>} />
          <Route path="/menu/" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/map/:vendorName" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/available-now" element={<ProtectedRoute><AvailableNow /></ProtectedRoute>} />
          <Route path="/add-review" element={<ProtectedRoute><AddReview /></ProtectedRoute>} />
          <Route path="/reviews/" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
          <Route path="/vendormenu" element={<ProtectedRoute><VendorMenu /></ProtectedRoute>} />
          <Route path="/vendorhome" element={<ProtectedRoute><VendorHome /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserMyProfile /></ProtectedRoute>} />
          <Route path="/user-preferences" element={<ProtectedRoute><UserPreferences /></ProtectedRoute>} />
          <Route path="/user-preferences/" element={<ProtectedRoute><UserPreferencesPage /></ProtectedRoute>} />
          <Route path="/edit-food-item/:_id" element={<ProtectedRoute><EditFoodItem /></ProtectedRoute>} />
          <Route path="/edit-food-item-admin/:_id" element={<AdminProtectedRoute ready={ready}><EditFoodItemAdmin /></AdminProtectedRoute>} />
          <Route path="/edit-vendor-item/:_id" element={<ProtectedRoute><EditVendorItem /></ProtectedRoute>} />
          <Route path="/list-food-item-admin" element={<AdminProtectedRoute ready={ready}><ListFoodItemsAdmin /></AdminProtectedRoute>} />
          <Route path="/admin-panel" element={<AdminProtectedRoute ready={ready}><AdminPanel /></AdminProtectedRoute>} />
          <Route path="/vendors" element={<ProtectedRoute ready={ready}><ListVendors /></ProtectedRoute>} />
          <Route path="/vendors-vendor" element={<ProtectedRoute ready={ready}><ListVendorsVendor /></ProtectedRoute>} />
          <Route path="/vendors-admin" element={<AdminProtectedRoute ready={ready}><ListVendorsAdmin /></AdminProtectedRoute>} />
          <Route path="/edit-vendor-item-admin/:_id" element={<AdminProtectedRoute ready={ready}><EditVendorItemAdmin /></AdminProtectedRoute>} />
          <Route path="/edit-vendor-menu-admin/" element={<AdminProtectedRoute ready={ready}><MenuAdmin /></AdminProtectedRoute>} />
          <Route path="/add-vendors" element={<ProtectedRoute ready={ready}><AddVendors /></ProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="/top-picks" element={<ProtectedRoute ready={ready}><TopPicks /></ProtectedRoute>} />
          <Route path="/add-review" element={<ProtectedRoute><AddReview /></ProtectedRoute>} />
          <Route path="/reviews/" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
