/**
 * Styles for RegisterOrLoginForm component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '5px',
  },
  contentContainer: {
    display: 'flex',
  },
  content: {
    width: 'fit-content',
    maxWidth: '70%',
  },
  message: {
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
  },
  user: {
    padding: theme.spacing(1.5),
    width: 'fit-content',
  },
  send: {
    flexDirection: 'row-reverse',
  },
  recieve: {
    flexDirection: 'row',
  },
}));
