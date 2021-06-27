/**
 * Contains the NewChatForm component.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import Input from './Input/Input';
import NewItemInput from './NewItemInput/NewItemInput';
import MemberList from './MemberList/MemberList';

import { createChat } from '../../actions/chats';

const INITIAL_FORM = {
  chatName: '',
  newMember: '',
};

const NewChatForm = ({ onDiscard }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setForm] = useState(INITIAL_FORM);
  const [members, setMembers] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Adds an email to the members array.
   */
  const handleAddMember = () => {
    if (!members.includes(form.newMember)) {
      setMembers([...members, form.newMember]);
    }
    setForm({ ...form, newMember: '' });
  };

  /**
   * Deletes an email from the members array.
   * @param {string} deletedEmail the email to be deleted
   */
  const handleDeleteMember = (deletedEmail) => {
    setMembers((prevParticipants) => (
      prevParticipants.filter((email) => deletedEmail !== email)
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const chatData = {
      name: form.chatName,
      members,
    };

    dispatch(createChat(chatData));
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
          <NewItemInput name="newMember" label="Add member by email" value={form.newMember} type="email" handleChange={handleChange} onAddItem={handleAddMember} />

          {/* added participants */}
          <Typography className={classes.title} variant="body2">{`Added Members: (${members.length})`}</Typography>
          <MemberList userEmails={members} onEmailDelete={handleDeleteMember} />

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
