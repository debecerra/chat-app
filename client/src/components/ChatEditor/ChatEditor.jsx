import React from 'react';

import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';

import Message from './Message/Message';
import Input from './Input/Input';
import useStyles from './styles';

const messages = [
  { text: 'Hey! How are you?', type: 'send', user: 'Joe Smith' },
  { text: 'I\'m doing pretty good, hbu?', type: 'recieve', user: 'Alberto Guerra' },
  { text: 'Same!', type: 'send', user: 'Joe Smith' },
  { text: 'Did you finish the homework?', type: 'send', user: 'Joe Smith' },
  { text: 'I\'m stuck on the second question', type: 'send', user: 'Joe Smith' },
  { text: 'This is a really long message. I wonder how it will appear in the UI. Hoepfully it looks good and doesn\nt wrap in some strange way.', type: 'recieve', user: 'Alberto Guerra' },
  { text: 'Maybe if you could spell, that would be better. I would honestly expect higher vocabulary from you, this is quite embaressing!', type: 'send', user: 'Alberto Guerra' },
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
