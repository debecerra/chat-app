/**
 * Contains implementation of the Dashboard component.
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import MainAppBar from '../MainAppBar/MainAppBar';
import ChatListDrawer from '../ChatListDrawer/ChatListDrawer';
import ChatEditor from '../ChatEditor/ChatEditor';
import NewChatForm from '../NewChatForm/NewChatForm';

import { getUserChats } from '../../actions/chats';
import { chatInviteListener } from '../../api/sockets/chats';
import useStyles from './styles';

/**
 * Main dashboard that allows users to interact with all functionality of the application.
 */
const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [newChatFormOpen, setNewChatFormOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // actions to be executed when the Dashboard is first rendered
  useEffect(() => {
    // get all chat that the user is in
    dispatch(getUserChats());
    chatInviteListener.on(user); // still need to check this works as expected

    return () => {
      chatInviteListener.off();
    };
  }, []);

  /**
   * Toggles the open state of the ChatListDrawer.
   */
  const toggleChatListDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  const handleNewChatClick = () => {
    setNewChatFormOpen(true);
  };

  return (
    <div commponent="main" className={classes.root}>
      <MainAppBar toggleOpenDrawer={toggleChatListDrawer} handleNewChatClick={handleNewChatClick} />
      <Paper className={classes.paper} elevation={5}>
        <ChatListDrawer open={drawerOpen} openNewChatForm={handleNewChatClick} />
        <ChatEditor isChatListDrawerOpen={drawerOpen} />
      </Paper>

      <Modal
        open={newChatFormOpen}
        onClose={() => setNewChatFormOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <NewChatForm />
      </Modal>
    </div>
  );
};

export default Dashboard;
