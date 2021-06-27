/**
 * Styles for ChatListDrawer component.
 */

import { makeStyles } from '@material-ui/core/styles';

import { CHAT_LIST_DRAWER_WIDTH } from '../../constants/components';

export default makeStyles((theme) => ({
  drawer: {
    width: CHAT_LIST_DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: CHAT_LIST_DRAWER_WIDTH,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  newChatButtonContainer: {
    padding: theme.spacing(2, 1, 0),
  },
}));
