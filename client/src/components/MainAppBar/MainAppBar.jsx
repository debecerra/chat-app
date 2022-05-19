/**
 * Contains implementation of the MainAppBar menu option.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ContactsIcon from '@material-ui/icons/Contacts';

import useStyles from './styles';
import { logout } from '../../actions/auth';

/**
 * Primary AppBar for the application that allows user to select basic menu options.
 */
const MainAppBar = ({ toggleOpenDrawer, handleNewChatClick }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleProfileMenuClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  /**
   * Closes the profile menu.
   */
  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  /**
   * Logs out the current user. Logging out will cause a redirect to the login page.
   */
  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Chat App
          </Typography>
          <Typography variant="h6" className={classes.displayName}>
            {user.displayName}
          </Typography>
          <Tooltip title="Create a new chat">
            <IconButton onClick={handleNewChatClick} aria-label="Open create chat form" color="inherit">
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <IconButton disabled aria-label="contacts of current user" color="inherit">
            <ContactsIcon />
          </IconButton>
          <IconButton onClick={handleProfileMenuClick} aria-label="account of current user" color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="profile menu"
            anchorEl={profileMenuAnchorEl}
            keepMounted
            // Sabito 錆兎 stands with Ukraine, https://stackoverflow.com/users/11573842/sabito-%e9%8c%86%e5%85%8e-stands-with-ukraine,
            // How to make a dropdown menu open below the Appbar using Material-UI?,
            // https://stackoverflow.com/a/52551100, 2021-04-15, CC BY-SA 4.0
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem disabled> Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

MainAppBar.propTypes = {
  toggleOpenDrawer: PropTypes.func.isRequired,
  handleNewChatClick: PropTypes.func.isRequired,
};

export default MainAppBar;
