/**
 * Contains the Home component which acts as the main landing page for the web app.
 */

import { Typography, Button, Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import * as api from '../../api/index';

const Home = () => {
  // current user stored in redux store
  const user = useSelector((state) => state.currentUser.user);

  /// current user state
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentUser(user);
  }, [user, dispatch]);

  const handleClickGetUser = async () => {
    api.getUser()
      // eslint-disable-next-line no-alert
      .then((res) => alert(JSON.stringify(res.data?.user)))
      // eslint-disable-next-line no-alert
      .catch((err) => alert(JSON.stringify(err.response?.data?.message)));
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <Typography>
        {currentUser === null ? 'Sign in to get started' : `Welcome ${currentUser.fullName}`}
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
