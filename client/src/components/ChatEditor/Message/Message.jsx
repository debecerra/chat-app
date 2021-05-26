/**
 * Contains implementation of the Message Component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

/**
 * A single chat message in a ChatEditor component.
 */
const Message = ({ text, type, user }) => {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.message}>

      {/* wrapper for content */}
      <Container
        disableGutters
        className={clsx(classes.contentOuter, {
          [classes.send]: type === 'send',
          [classes.receive]: type === 'recieve',
        })}
      >

        {/* content of message */}
        <div className={classes.content}>

          {/* message */}
          <Paper className={classes.messageBody} variant="outlined">
            <Typography variant="body1">
              {text}
            </Typography>
          </Paper>

          {/* username */}
          {type === 'receive' && (
            <Typography className={classes.user} variant="subtitle2" align="left">
              {user}
            </Typography>
          )}

        </div>

      </Container>

    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired, // the text of the message
  type: PropTypes.string.isRequired, // 'send' or 'recieve'
  user: PropTypes.string.isRequired, // the user that send the message
};

export default Message;
