import React from 'react';

import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import ChatListItem from './ChatListItem/ChatListItem';
import useStyles from './styles';

const chats = [
  {
    id: 1,
    name: 'Cool Bear Hangout!',
    members: [
      'slickyThinky 101',
      'Don Theata',
    ],
  },
  {
    id: 2,
    name: 'Sloppy Joe Thursdays',
    members: [
      'Timmy Turner',
      'Lummy Joe',
    ],
  },
  {
    id: 3,
    name: 'What if we... 😲',
    members: [
      'slickyThinky 101',
      'Don Theata',
    ],
  },
];

// eslint-disable-next-line arrow-body-style
const ChatList = () => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <List>
        {chats.map((chat) => (
          <ChatListItem chat={chat} />
        ))}
      </List>
    </Container>
  );
};

export default ChatList;
