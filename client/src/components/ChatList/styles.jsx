/**
 * Styles for RegisterOrLoginForm component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
    maxWidth: '20em',
    // border: 'solid 1px black',
    overflow: 'auto',
  },
  item: {
    border: 'solid 2px #717171',
    margin: '1rem 0',
    borderRadius: '12px',
  },
}));
