import React from 'react';

// import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import MainAppBar from '../MainAppBar/MainAppBar';
import ChatList from '../ChatListDrawer/ChatListDrawer';
import ChatEditor from '../ChatEditor/ChatEditor';

import useStyles from './styles';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div commponent="main" className={classes.root}>
      <MainAppBar />
      <Paper className={classes.paper} elevation={5}>
        <ChatList />
        <Divider orientation="vertical" flexItem />
        <ChatEditor />
      </Paper>
    </div>
  );
};

export default Dashboard;
