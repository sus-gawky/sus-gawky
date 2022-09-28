import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Landing from '../pages/Landing';
import Setup from '../pages/Setup';
import ListChallenges from '../pages/ListChallenges';
import Neighbors from '../pages/Neighbors';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import ManageChallenge from '../pages/ManageChallenge';
import Home from '../pages/Home';
import Global from '../pages/Global';
import Store from '../pages/Store';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Row>
        <Col className="col-auto" style={{ marginRight: 80 }}>
          <NavBar />
        </Col>
        <Col>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/setup" element={<ProtectedRoute><Setup /></ProtectedRoute>} />
            <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
            <Route path="/challenges" element={<ProtectedRoute><ListChallenges /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><AddStuff /></ProtectedRoute>} />
            <Route path="/edit/:_id" element={<ProtectedRoute><ManageChallenge /></ProtectedRoute>} />
            <Route path="/neighbors" element={<ProtectedRoute><Neighbors /></ProtectedRoute>} />
            <Route path="/homepage" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><Global /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminProtectedRoute><ListStuffAdmin /></AdminProtectedRoute>} />
            <Route path="/notauthorized" element={<NotAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Col>
      </Row>
    </div>
  </Router>
);

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
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
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
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Landing />,
};

export default App;
