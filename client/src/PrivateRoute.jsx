import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// https://stackoverflow.com/a/47476903
/**
 * Route that is only accessible when the user is authenticated.
 */
const PrivateRoute = ({ component: Component, exact }) => {
  const loggedIn = useSelector((state) => state.currentUser.loggedIn);

  return (
    <Route
      exact={exact}
      render={(componentProps) => (
        loggedIn ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
        ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
};

export default PrivateRoute;
