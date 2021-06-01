/**
 * Contains implementation of the ChatListDrawer component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

import ChatListItem from './ChatListItem/ChatListItem';
import useStyles from './styles';

/**
 * A collapsable drawer that allows users to select from their different chats.
 */
const ChatListDrawer = ({ open }) => {
  const classes = useStyles();

  const chats = useSelector((state) => state.chats);

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
          <div className={classes.newChatButtonContainer}>
            <Button className={classes.newChatButton} fullWidth color="secondary" variant="outlined">
              Create a new chat
            </Button>
          </div>
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
