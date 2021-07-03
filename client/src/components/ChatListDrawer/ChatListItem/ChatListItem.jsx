/* eslint-disable no-unused-vars */
/**
 * Contains implementation of the ChatListItem component.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './styles';

/**
 * A single list item in a ChatListDrawer.
 */
const ChatListItem = ({ name, members }) => {
  const classes = useStyles();

  // current user
  const user = useSelector((state) => state.auth.user);

  // anchor for chat menu
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * Handles a click on the menu button by opening the chat menu.
   * @param {object} event the event that was triggered
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the chat menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className={classes.item}>
      <ListItem className={classes.content} button>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-controls="chat menu"
            aria-haspopup="true"
            aria-label="chat menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="chat-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled onClick={handleClose}>Add or remove members</MenuItem>
            <MenuItem disabled onClick={handleClose}>Leave chat</MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    </Container>
  );
};

ChatListItem.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  })),
};

ChatListItem.defaultProps = {
  members: [],
};

export default ChatListItem;
