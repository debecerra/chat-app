import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';

const ChatListItem = (props) => {
  const { chat } = props;

  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <ListItem className={styles.item} button>
        <ListItemAvatar>
          <Avatar alt="Profile Pic" />
        </ListItemAvatar>
        <ListItemText primary={chat.name} secondary={chat.members[0]} />
      </ListItem>
    </Container>
  );
};

ChatListItem.propTypes = {
  chat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default ChatListItem;
