import React from 'react';

import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';

import Message from './Message/Message';
import useStyles from './styles';

const messages = [
  { text: 'Hey! How are you?', type: 'send', user: 'Joe Smith' },
  { text: 'I\'m doing pretty good, hbu?', type: 'recieve', user: 'Alberto Guerra' },
  { text: 'Same!', type: 'send' },
  { text: 'Did you finish the homework?', type: 'send', user: 'Joe Smith' },
  { text: 'I\'m stuck on the second question', type: 'send', user: 'Joe Smith' },
  { text: 'This is a really long message. I wonder how it will appear in the UI. Hoepfully it looks good and doesn\nt wrap in some strange way.', type: 'recieve', user: 'Alberto Guerra' },
];

const ChatEditor = () => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      {messages.map((message) => (
        <Message text={message.text} type={message.type} user={message.user} />
      ))}
    </Container>
  );
};

export default ChatEditor;
