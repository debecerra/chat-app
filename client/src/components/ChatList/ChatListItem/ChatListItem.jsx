/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './styles';

const ChatListItem = (props) => {
  const { name, members } = props;

  const user = useSelector((state) => state.currentUser.user);
  const loggedIn = useSelector((state) => state.currentUser.loggedIn);

  const styles = useStyles();

  const getMembersString = (memberArr) => {
    const otherMembers = memberArr.filter((m) => m.name !== user.displayName);
    switch (otherMembers.length) {
      case 0:
        return 'No one else';
      case 1:
        return otherMembers[0].name;
      case 2:
        return `${otherMembers[0].name} and ${otherMembers[1].name}`;
      default:
        return `${otherMembers[0].name}, ${otherMembers[1].name} and others`;
    }
  };

  return (
    <Container className={styles.root}>
      <ListItem className={styles.item} button>
        <ListItemAvatar>
          <Avatar alt="Profile Pic" />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={getMembersString(members)} />
      </ListItem>
    </Container>
  );
};

ChatListItem.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  })).isRequired,
};

export default ChatListItem;
