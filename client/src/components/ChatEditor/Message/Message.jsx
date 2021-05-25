import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
// import { ListItemText } from '@material-ui/core';

import useStyles from './styles';

const Message = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { text, type, user } = props;
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <ListItem className={`${classes.contentContainer} 
        ${type === 'send' && classes.send}
        ${type === 'recieve' && classes.recieve}`}
      >
        <div className={classes.content}>
          <Paper className={classes.message} variant="outlined">
            <Typography variant="body1">
              {text}
            </Typography>
          </Paper>
          {type === 'recieve' && (
            <Typography
              className={classes.user}
              variant="subtitle2"
              align="left"
            >
              {user}
            </Typography>
          )}
        </div>
      </ListItem>
    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default Message;
