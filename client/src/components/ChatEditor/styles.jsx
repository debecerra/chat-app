/**
 * Styles for RegisterOrLoginForm component.
 */

import { makeStyles } from '@material-ui/core/styles';

import { CHAT_LIST_DRAWER_WIDTH } from '../../constants/components';

export default makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -CHAT_LIST_DRAWER_WIDTH,

    display: 'flex',
    flexDirection: 'column',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  messages: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    /* Jim Hall https://stackoverflow.com/users/965352/jim-hall,
     * "Keep overflow div scrolled to bottom unless user scrolls up",
     * 05-18-2017, https://stackoverflow.com/a/44051405, CC BY-SA 3.0
     */
    display: 'flex',
    flexDirection: 'column-reverse',
  },
}));
