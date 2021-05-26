/**
 * Contains implementation of the MainAppBar menu option.
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ContactsIcon from '@material-ui/icons/Contacts';

import useStyles from './styles';

/**
 * Primary AppBar for the application that allows user to select basic menu options.
 */
const MainAppBar = ({ toggleOpenDrawer }) => {
  const classes = useStyles();

  const handleProfileMenuOpen = () => {
    console.log('Profile button clicked');
  };

  const handleNewChatMenuOpen = () => {
    console.log('Add button clicked');
  };

  const handleContactsMenuOpen = () => {

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Chat App
          </Typography>
          <IconButton onClick={handleNewChatMenuOpen} aria-label="create a new chat" color="inherit">
            <AddCircleIcon />
          </IconButton>
          <IconButton disabled onClick={handleContactsMenuOpen} aria-label="contacts of current user" color="inherit">
            <ContactsIcon />
          </IconButton>
          <IconButton disabled onClick={handleProfileMenuOpen} aria-label="account of current user" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

MainAppBar.propTypes = {
  toggleOpenDrawer: PropTypes.func.isRequired,
};

export default MainAppBar;
