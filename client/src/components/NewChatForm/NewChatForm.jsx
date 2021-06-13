/**
 * Contains the NewChatForm component.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import Input from './Input/Input';
import NewItemInput from './NewItemInput/NewItemInput';
import ParticpantList from './ParticipantsList/ParticipantsList';

const INITIAL_FORM = {
  chatName: '',
  newParticipant: '',
};

const NewChatForm = ({ onDiscard }) => {
  const classes = useStyles();

  const [form, setForm] = useState(INITIAL_FORM);
  const [participants, setParticipants] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Adds an email to the participants array.
   */
  const handleAddParticipant = () => {
    if (!participants.includes(form.newParticipant)) {
      setParticipants([...participants, form.newParticipant]);
    }
    setForm({ ...form, newParticipant: '' });
  };

  /**
   * Deletes an email from the participants array.
   * @param {string} deletedEmail the email to be deleted
   */
  const handleDeleteParticipant = (deletedEmail) => {
    setParticipants((prevParticipants) => (
      prevParticipants.filter((email) => deletedEmail !== email)
    ));
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
          <Input name="chatName" label="Enter name for new chat room" value={form.chatName} type="text" autoFocus handleChange={handleChange} />

          {/* add participants */}
          <NewItemInput name="newParticipant" label="Add participant by email" value={form.newParticipant} type="email" handleChange={handleChange} onAddItem={handleAddParticipant} />

          {/* added participants */}
          <Typography className={classes.title} variant="body2">{`Added Members: (${participants.length})`}</Typography>
          <ParticpantList userEmails={participants} onEmailDelete={handleDeleteParticipant} />

          {/* action buttons */}
          <Button className={classes.button} variant="contained" color="primary" type="submit">Create</Button>
          <Button className={classes.button} variant="outlined" color="secondary" onClick={onDiscard}>Discard</Button>

        </form>
      </Paper>
    </Container>
  );
};

NewChatForm.propTypes = {
  onDiscard: PropTypes.func,
};

NewChatForm.defaultProps = {
  onDiscard: null,
};

export default NewChatForm;
