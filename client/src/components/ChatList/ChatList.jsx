import React from 'react';

import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useStyles from './styles';

// eslint-disable-next-line arrow-body-style
const ChatList = () => {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <List>
        <ListItem className={styles.item} button>
          <ListItemText>
            Group 1
          </ListItemText>
        </ListItem>
        <ListItem className={styles.item} button>
          <ListItemText>
            Group 2
          </ListItemText>
        </ListItem>
        <ListItem className={styles.item} button>
          <ListItemText>
            Group 3
          </ListItemText>
        </ListItem>
      </List>
    </Container>
  );
};

export default ChatList;
