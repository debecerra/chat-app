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
import { getMessages } from '../../actions/messages';

// const messages1 = [
//   {
//     id: 1,
//     text: 'Maybe if you nestly expect higher vocabulary from you, this is quite embaressing!',
//     type: 'send',
//     user: 'Alberto Guerra',
//   },
//   {
//     id: 2,
//     text: 'Maybe if you could gher vocabulary from you, this is quite embaressing!',
//     type: 'send',
//     user: 'Alberto Guerra',
//   },
//   {
//     id: 3,
//     text: 'Maybe if you coct higher vocabulary from you, this is quite embaressing!',
//     type: 'send',
//     user: 'Alberto Guerra',
//   },
//   {
//     id: 14,
//     text: 'tly expect higher vocabulary from you, this is quite embaressing!',
//     type: 'send',
//     user: 'Alberto Guerra',
//   },
// ];

/**
 * Displays messages of a chat and allows the user to send messages to the chat.
 */
const ChatEditor = ({ isChatListDrawerOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const activeChat = useSelector((state) => state.chats.active.id);
  const messages = useSelector((state) => state.messages.all);
  const user = useSelector((state) => state.auth.user);

  // update messages if active chat changes
  useEffect(() => {
    dispatch(getMessages(activeChat));
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
