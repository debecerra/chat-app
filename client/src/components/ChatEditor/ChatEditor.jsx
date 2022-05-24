/**
 * Contains implementation of the ChatEditor component.
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';

import Message from './Message/Message';
import Input from './NewMessageInput/NewMessageInput';
import useStyles from './styles';
import { getMessages, subscribeToMessages, unsubscribeFromMessages } from '../../actions/messages';

/**
 * Displays messages of a chat and allows the user to send messages to the chat.
 */
const ChatEditor = ({ isChatListDrawerOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const activeChat = useSelector((state) => state.chats.active?.id);
  const messages = useSelector((state) => state.messages.all);
  const user = useSelector((state) => state.auth.user);

  // update messages if active chat changes
  useEffect(() => {
    if (activeChat) dispatch(getMessages(activeChat)); // get all existing messages
    if (activeChat) dispatch(subscribeToMessages(activeChat));// add listener for new messages
    return () => {
      unsubscribeFromMessages(activeChat); // remove listener for new messages
    };
  }, [activeChat]);

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.content, {
        [classes.contentShift]: isChatListDrawerOpen,
      })}
    >
      {/* the messages of the chat */}
      <Container disableGutters className={classes.messages}>
        {messages.map((message) => (
          <Message key={message.id} text={message.body} type={message.author === user.email ? 'send' : 'receive'} author={message.author} />
        ))}
      </Container>

      {/* the text field for creating new messages */}
      <Input />

    </Container>
  );
};

ChatEditor.propTypes = {
  isChatListDrawerOpen: PropTypes.bool.isRequired, // true if ChatListDrawer is in open state
};

export default ChatEditor;
