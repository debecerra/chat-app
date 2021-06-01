/**
 * Styles for ChatListItem component.
 */

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1, 2),
  },
  content: {
    border: 'solid 1px rgba(0, 0, 0, 0.87)',
    borderRadius: theme.spacing(1.5),
  },
}));
