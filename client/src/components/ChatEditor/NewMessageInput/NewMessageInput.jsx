/**
 * Contains implementation of the NewMessageInput component.
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import useStyles from './styles';
import { createMessage } from '../../../actions/messages';

/**
 * Collects new message text input from the user in a ChatEditor component.
 */
const NewMessageInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const activeChat = useSelector((state) => state.chats.active?.id);

  const [messageText, setMessageText] = useState('');

  /**
   * Sends a message to the active chat
   * @param message the message to send
   */
  const sendMessage = (message) => {
    if (activeChat) dispatch(createMessage(activeChat, message, user.email));
  };

  /**
   * Handles a Change event in the TextField.
   * @param e the event that was triggered
   */
  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  /**
   * Handles a OnKeyPress event in the TextField.
   * @param e the event that was triggered
   */
  const handleOnKeyPress = (e) => {
    /* MDN Web Docs, "KeyboardEvent.ctrlKey", 03-29-2021,
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey, Public Domain
     */
    if (e.ctrlKey && e.key === 'Enter') {
      // Send the message if Ctrl-Enter is clicked
      e.preventDefault();
      sendMessage(messageText);
      setMessageText('');
    }
  };

  /**
   * Handles a Click event in the SendIcon.
   */
  const handleSendIconClick = () => {
    sendMessage(messageText);
    setMessageText('');
  };

  return (
    <Container className={classes.root}>
      <TextField
        id="filled-textarea"
        label="Placeholder"
        value={messageText}
        fullWidth
        placeholder="Placeholder"
        multiline
        rowsMax={4}
        variant="outlined"
        onChange={handleChange}
        onKeyDown={handleOnKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSendIconClick}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default NewMessageInput;
