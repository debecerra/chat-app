/**
 * Styles for RegisterOrLoginForm component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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
    margin: theme.spacing(1),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  switchModeButton: {
    margin: theme.spacing(1, 0),
  },
  googleButton: {
    margin: theme.spacing(2, 0),
  },
  googleButtonParent: {
    display: 'flex',
    justifyContent: 'center',
    borderTop: 'dashed lightgrey',
    width: '100%',
    // https://stackoverflow.com/a/53781985
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));
