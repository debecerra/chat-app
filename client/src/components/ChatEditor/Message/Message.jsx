import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const Message = ({ text, type, user }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container
        disableGutters
        className={`${classes.contentContainer} 
        ${type === 'send' && classes.send} 
        ${type === 'receive' && classes.receive}`}
      >
        <div className={classes.content}>
          <Paper className={classes.message} variant="outlined">
            <Typography variant="body1">
              {text}
            </Typography>
          </Paper>
          {type === 'receive' && (
            <Typography
              className={classes.user}
              variant="subtitle2"
              align="left"
            >
              {user}
            </Typography>
          )}
        </div>
      </Container>
    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default Message;
