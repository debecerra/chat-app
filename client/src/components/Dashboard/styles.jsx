/**
 * Styles for the Dashboard component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: 0,
  },
  paper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    minHeight: 0,
  },
}));
