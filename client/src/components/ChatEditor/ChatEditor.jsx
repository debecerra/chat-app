import React from 'react';

import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

// eslint-disable-next-line arrow-body-style
const ChatEditor = () => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      Chat Editor
    </Container>
  );
};

export default ChatEditor;
