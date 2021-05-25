/**
 * Styles for RegisterOrLoginForm component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    height: '100%',
    overflow: 'auto',
  },
}));
