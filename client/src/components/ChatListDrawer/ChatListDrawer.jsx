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
const ChatListDrawer = ({ open, openNewChatForm }) => {
  const classes = useStyles();

  const chats = useSelector((state) => state.chats.all);

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
        <div className={classes.newChatButtonContainer}>
          <Button className={classes.newChatButton} fullWidth color="secondary" variant="outlined" onClick={openNewChatForm}>
            Create a new chat
          </Button>
        </div>
        <List>
          {chats.map((chat) => (
            <ChatListItem key={chat.id} id={chat.id} name={chat.name} />
          ))}
        </List>
      </div>
    </Drawer>
  );
};

ChatListDrawer.propTypes = {
  open: PropTypes.bool.isRequired, // true if the drawer is open
  openNewChatForm: PropTypes.func, // function that opens a new chat form
};

ChatListDrawer.defaultProps = {
  openNewChatForm: null,
};

export default ChatListDrawer;
