/**
 * Contains the Home component which acts as the main landing page for the web app.
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { Typography, Button, Box } from '@material-ui/core';

import { fetchCurrentUser, logout } from '../../actions/auth';
import * as api from '../../api/index';

/**
 * Home page for the web application.
 */
const Home = () => {
  const user = useSelector((state) => state.currentUser.user);
  const loggedIn = useSelector((state) => state.currentUser.loggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // state of the current user profile as it is displayed in the front end
  const [currentUser, setCurrentUser] = useState(null);

  // fetch the user data, if needed, when the page is first rendered
  useEffect(() => {
    console.log(loggedIn);
    const queryParams = new URLSearchParams(location.search);

    if (loggedIn && !user) {
      // if user is logged in, fetch the user data
      dispatch(fetchCurrentUser());
    } else if (queryParams.get('googleSuccess') && !user) {
      // if redirected from Google Sign In, fetch the user data
      dispatch(fetchCurrentUser());

      /* Ajeet Shah, https://stackoverflow.com/users/2873538/ajeet-shah
       * "How to remove query param with react hooks?", 26-05-2020
       * https://stackoverflow.com/a/62032451, CC BY-SA 4.0
       */
      // update the URL so that URL query does not trigger unexpected data fetch
      queryParams.delete('googleSuccess');
      history.replace({
        search: queryParams.toString(),
      });
    }
  }, []);

  // update currentUser state to reflect changes to user store
  useEffect(() => {
    setCurrentUser(user);
  }, [user, dispatch]);

  /**
   * TEMP: execute a GET request to server /user route
   */
  const handleClickGetUser = async () => {
    api.getUser()
      // eslint-disable-next-line no-alert
      .then((res) => alert(JSON.stringify(res.data?.user)))
      // eslint-disable-next-line no-alert
      .catch((err) => alert(JSON.stringify(err.response?.data?.message)));
  };

  /**
   * Dispatch the logout action when logout button is clicked
   */
  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <Typography>
        {currentUser === null ? 'Sign in to get started' : `Welcome ${currentUser.displayName}`}
      </Typography>
      <Button onClick={handleClickGetUser}>
        Get User
      </Button>
      <Button href="/login">
        Login
      </Button>
      <Button onClick={handleClickLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
