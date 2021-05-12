import React from 'react';
import { Paper, Container } from '@material-ui/core';

import Input from './Input';
import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Input name="fullName" label="Full Name" />
        {/* <Input /> */}
      </Paper>
    </Container>
  );
};

export default Auth;
