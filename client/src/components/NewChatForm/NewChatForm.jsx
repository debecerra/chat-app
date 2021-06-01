/**
 * Contains the RegisterOrLoginForm component which allows users to register a new account
 * or sign in using an existing account.
 */

import React from 'react';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import useStyles from './styles';

const NewChatForm = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="xs">

      {/* form */}
      <Paper className={classes.paper} elevation={5}>
        <form onSubmit={handleSubmit}>
          <Button type="submit">Click me</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewChatForm;
