import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import ChatList from '../ChatList/ChatList';
import ChatEditor from '../ChatEditor/ChatEditor';

import useStyles from './styles';

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  const styles = useStyles();

  return (
    <Container commponent="main" className={styles.root}>
      <Paper className={styles.paper}>
        <ChatList />
        <Divider orientation="vertical" flexItem />
        <ChatEditor />
      </Paper>
    </Container>
  );
};

export default Dashboard;
