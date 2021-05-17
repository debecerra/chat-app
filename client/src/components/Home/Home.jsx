// eslint-disable-next-line object-curly-newline
import { Typography, Button, Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import * as api from '../../api/index';

const Home = () => {
  const user = useSelector((state) => state.currentUser.user);
  const [currentUser, setCurrentUser] = useState(user);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUser(user);
  }, [user, dispatch]);

  const getUser = async () => {
    api.getUser().then((res) => console.log(res));
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <Typography>
        {(currentUser === null) ? 'No User is logged in' : currentUser.email}
      </Typography>
      <Button onClick={getUser}>
        Get User
      </Button>
      <Button onClick={handleClickLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
