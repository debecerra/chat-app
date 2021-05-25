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
    /* Jim Hall https://stackoverflow.com/users/965352/jim-hall,
     * "Keep overflow div scrolled to bottom unless user scrolls up",
     * 05-18-2017, https://stackoverflow.com/a/44051405, CC BY-SA 3.0
     */
    display: 'flex',
    flexDirection: 'column-reverse',
  },
}));
