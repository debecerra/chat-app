/**
 * Styles for RegisterOrLoginForm component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  message: {
    padding: theme.spacing(0.5, 1),
  },
  contentOuter: {
    display: 'flex',
  },
  content: {
    width: 'fit-content',
    maxWidth: '80%',
  },
  messageBody: {
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
  },
  user: {
    padding: theme.spacing(0.5, 1.5, 1.5),
  },
  send: {
    flexDirection: 'row-reverse',
  },
  receive: {
    flexDirection: 'row',
  },
}));
