/**
 * Styles for MainAppBar component.
 */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  displayName: {
    margin: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
