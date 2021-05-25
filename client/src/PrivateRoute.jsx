import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/* bluesixty https://stackoverflow.com/users/208079/bluesixty,
 * "When user is not logged in redirect to login. Reactjs [duplicate]", 11-24-2017
 * https://stackoverflow.com/a/47476903, CC BY-SA 3.0
 */

/**
 * Route that is only accessible when the user is authenticated.
 */
const PrivateRoute = ({ component: Component, exact }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

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
