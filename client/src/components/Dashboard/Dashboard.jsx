/**
 * Contains implementation of the Dashboard component.
 */

import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import MainAppBar from '../MainAppBar/MainAppBar';
import ChatListDrawer from '../ChatListDrawer/ChatListDrawer';
import ChatEditor from '../ChatEditor/ChatEditor';

import useStyles from './styles';

/**
 * Main dashboard that allows users to interact with all functionality of the application.
 */
const Dashboard = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(true);

  /**
   * Toggles the open state of the ChatListDrawer.
   */
  const toggleChatListDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  return (
    <div commponent="main" className={classes.root}>
      <MainAppBar toggleOpenDrawer={toggleChatListDrawer} />
      <Paper className={classes.paper} elevation={5}>
        <ChatListDrawer open={drawerOpen} />
        <ChatEditor isChatListDrawerOpen={drawerOpen} />
      </Paper>
    </div>
  );
};

export default Dashboard;
