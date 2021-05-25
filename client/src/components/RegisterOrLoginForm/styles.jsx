/**
 * Styles for RegisterOrLoginForm component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  input: {
    margin: theme.spacing(1, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
  switchModeButton: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    width: '100%',
  },
  googleButton: {
    margin: theme.spacing(2, 0),
  },
  googleButtonParent: {
    display: 'flex',
    justifyContent: 'center',
    // borderTop: 'dashed lightgrey',
    width: '100%',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));
