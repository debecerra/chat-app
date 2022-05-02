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

const NewChatForm = React.forwardRef(({ onDiscard }, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [chatNameField, setChatNameField] = useState('');
  const [newMemberField, setNewMemberField] = useState('');
  const [members, setMembers] = useState([]);

  /**
   * Handles event when a change is detected.
   * @param {object} e the event that was triggered
   */
  const handleChange = (e) => {
    if (e.target.name === 'chatNameField') {
      setChatNameField(e.target.value);
    } else if (e.target.name === 'newMemberField') {
      setNewMemberField(e.target.value);
    }
  };

  /**
   * Adds the email in newMemberField state to the members array.
   */
  const handleAddMember = () => {
    const newMemberEmail = newMemberField.trim();
    if (newMemberEmail.length > 0 && !members.includes(newMemberEmail)) {
      setMembers([...members, newMemberEmail]);
    }
    setNewMemberField('');
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

  /**
   * Submit form data to create a new chat.
   * @param {object} e the event object that was triggered
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createChat(chatNameField, members));
    onDiscard();
  };

  return (
    <Container maxWidth="sm" ref={ref}>

      {/* form */}
      <Paper className={classes.paper} elevation={5}>
        <form className={classes.form} onSubmit={handleSubmit}>

          {/* title */}
          <Typography className={classes.title} variant="h5">Create a New Chat Room</Typography>

          {/* chat name */}
          <Input name="chatNameField" label="Enter name for new chat room" value={chatNameField} type="text" autoFocus handleChange={handleChange} />

          {/* add participants */}
          <NewItemInput name="newMemberField" label="Add member by email" value={newMemberField} type="email" handleChange={handleChange} onAddItem={handleAddMember} />

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
});

NewChatForm.propTypes = {
  onDiscard: PropTypes.func,
};

NewChatForm.defaultProps = {
  onDiscard: null,
};

export default NewChatForm;
