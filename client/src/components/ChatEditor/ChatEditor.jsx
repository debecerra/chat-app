import React from 'react';

import Container from '@material-ui/core/Container';

import Message from './Message/Message';
import Input from './NewMessageInput/NewMessageInput';
import useStyles from './styles';

const messages = [
  { text: 'Maybe if you could spell, that would be better. I would honestly expect higher vocabulary from you, this is quite embaressing!', type: 'send', user: 'Alberto Guerra' },
  { text: 'This is a really long message. I wonder how it will appear in the UI. Hoepfully it looks good and doesn\nt wrap in some strange way.', type: 'receive', user: 'Alberto Guerra' },
  { text: 'I\'m stuck on the second question', type: 'send', user: 'Joe Smith' },
  { text: 'Did you finish the homework?', type: 'send', user: 'Joe Smith' },
  { text: 'Same!', type: 'send', user: 'Joe Smith' },
  { text: 'I\'m doing pretty good, hbu?', type: 'receive', user: 'Alberto Guerra' },
  { text: 'Hey! How are you?', type: 'send', user: 'Joe Smith' },
  { text: 'Maybe if you could spell, that would be better. I would honestly expect higher vocabulary from you, this is quite embaressing!', type: 'send', user: 'Alberto Guerra' },
  { text: 'This is a really long message. I wonder how it will appear in the UI. Hoepfully it looks good and doesn\nt wrap in some strange way.', type: 'receive', user: 'Alberto Guerra' },
  { text: 'I\'m stuck on the second question', type: 'send', user: 'Joe Smith' },
  { text: 'Did you finish the homework?', type: 'send', user: 'Joe Smith' },
  { text: 'Same!', type: 'send', user: 'Joe Smith' },
  { text: 'I\'m doing pretty good, hbu?', type: 'receive', user: 'Alberto Guerra' },
  { text: 'Hey! How are you?', type: 'send', user: 'Joe Smith' },
];

const ChatEditor = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container disableGutters className={classes.messages}>
        {messages.map((message) => (
          <Message text={message.text} type={message.type} user={message.user} />
        ))}
      </Container>
      <Input />
    </Container>
  );
};

export default ChatEditor;
