import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import ChatList from '../ChatList/ChatList';
import ChatEditor from '../ChatEditor/ChatEditor';

import useStyles from './styles';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container commponent="main" className={classes.root}>
      <Paper className={classes.paper} elevation={5}>
        <ChatList />
        <Divider orientation="vertical" flexItem />
        <ChatEditor />
      </Paper>
    </Container>
  );
};

export default Dashboard;
