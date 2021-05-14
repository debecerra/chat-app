import { Typography, Button, Box } from '@material-ui/core';
import React from 'react';
import * as api from '../../api/index';

const Home = () => {
  const getUser = async () => {
    api.getUser().then((res) => console.log(res));
  };

  return (
    <Box>
      <Typography>
        No user
      </Typography>
      <Button onClick={getUser}>
        Get User
      </Button>
    </Box>
  );
};

export default Home;
