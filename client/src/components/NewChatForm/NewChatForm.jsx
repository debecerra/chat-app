/**
 * Contains the NewChatForm component.
 */

import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import Input from './Input';
import NewItemInput from './NewItemInput';

const INITIAL_FORM = {
  chatName: '',
  newParticipant: '',
};

const NewChatForm = () => {
  const classes = useStyles();

  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddParticipant = () => {
    alert(form.newParticipant);
    setForm({ ...form, newParticipant: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">

      {/* form */}
      <Paper className={classes.paper} elevation={5}>
        <form className={classes.form} onSubmit={handleSubmit}>

          {/* title */}
          <Typography className={classes.title} variant="h5">Create a New Chat Room</Typography>

          {/* chat name */}
          <Input name="chatName" label="Enter name for chat" value={form.chatName} type="text" autoFocus handleChange={handleChange} />

          {/* add participants */}
          <NewItemInput name="newParticipant" label="Add participant by email" value={form.newParticipant} type="email" handleChange={handleChange} onAddItem={handleAddParticipant} />

          {/* added participants */}
          <Typography className={classes.title} variant="body2">Added Members: (0)</Typography>

          {/* action buttons */}
          <Button className={classes.button} variant="contained" color="primary" type="submit">Create</Button>
          <Button className={classes.button} variant="outlined" color="secondary">Discard</Button>

        </form>
      </Paper>
    </Container>
  );
};

export default NewChatForm;
