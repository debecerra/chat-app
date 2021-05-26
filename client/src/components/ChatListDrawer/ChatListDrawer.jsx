/**
 * Contains implementation of the ChatListDrawer component.
 */

import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

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

/**
 * A collapsable drawer that allows users to select from their different chats.
 */
const ChatListDrawer = ({ open }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
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

ChatListDrawer.propTypes = {
  open: PropTypes.bool.isRequired, // true if the drawer is open
};

export default ChatListDrawer;
