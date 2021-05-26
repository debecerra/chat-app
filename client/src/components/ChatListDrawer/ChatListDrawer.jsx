import React from 'react';

// import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { Drawer, Toolbar } from '@material-ui/core';

import ChatListItem from './ChatListItem/ChatListItem';
import useStyles from './styles';

const chats = [
  {
    id: 1,
    name: 'Cool Bear Hangout!',
    members: [
      {
        name: 'slicky thiccy 101',
        isAdmin: true,
      },
      {
        name: 'Pop Tart',
        isAdmin: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Wings Night',
    members: [
      {
        name: 'Timmy Turner',
        isAdmin: true,
      },
      {
        name: 'slicky thiccy 101',
        isAdmin: false,
      },
    ],
  },
  {
    id: 3,
    name: 'What if we... 😲',
    members: [
      {
        name: 'slicky thiccy 101',
        isAdmin: true,
      },
      {
        name: 'Jeff Jones',
        isAdmin: false,
      },
      {
        name: 'Tommy Tomes',
        isAdmin: false,
      },
    ],
  },
];

// eslint-disable-next-line arrow-body-style
const ChatListDrawer = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {chats.map((chat) => (
            <ChatListItem key={chat.id} name={chat.name} members={chat.members} />
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default ChatListDrawer;
