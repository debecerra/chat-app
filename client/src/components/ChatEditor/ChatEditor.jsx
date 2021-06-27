/**
 * Contains implementation of the ChatEditor component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';

import Message from './Message/Message';
import Input from './NewMessageInput/NewMessageInput';
import useStyles from './styles';

const messages = [
  {
    id: 1,
    text: 'Maybe if you could spell, that would be better. I would honestly expect higher vocabulary from you, this is quite embaressing!',
    type: 'send',
    user: 'Alberto Guerra',
  },
  {
    id: 2,
    text: 'Maybe if you could spell, that would be better. I would honestly expect higher vocabulary from you, this is quite embaressing!',
    type: 'send',
    user: 'Alberto Guerra',
  },
  {
    id: 3,
    text: 'Maybe if you could spell, that would be better. I would honestly expect higher vocabulary from you, this is quite embaressing!',
    type: 'send',
    user: 'Alberto Guerra',
  },
  {
    id: 14,
    text: 'Maybe if you could spell, that would be better. I would honestly expect higher vocabulary from you, this is quite embaressing!',
    type: 'send',
    user: 'Alberto Guerra',
  },
];

/**
 * Displays messages of a chat and allows the user to send messages to the chat.
 */
const ChatEditor = ({ isChatListDrawerOpen }) => {
  const classes = useStyles();

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
          <Message key={message.id} text={message.text} type={message.type} user={message.user} />
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
