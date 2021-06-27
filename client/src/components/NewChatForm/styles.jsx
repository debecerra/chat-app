import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(10, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  form: {
    textAlign: 'left',
    width: '100%',
  },
  title: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1, 1, 1, 0),
  },
}));
