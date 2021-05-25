import React from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import useStyles from './styles';

// eslint-disable-next-line arrow-body-style
const Input = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <TextField
        id="filled-textarea"
        label="Placeholder"
        fullWidth
        placeholder="Placeholder"
        multiline
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default Input;
