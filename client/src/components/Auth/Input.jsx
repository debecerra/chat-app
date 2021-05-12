/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField, InputAdornment, IconButton, Box, Grid,
} from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './styles';

const Input = (props) => {
  const {
    name, label, autoFocus, type, isPassword, handleClickShowPassword, handleChange,
  } = props;

  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      name={name}
      label={label}
      variant="outlined"
      fullWidth
      required
      autoFocus={autoFocus}
      type={type}
      onChange={handleChange}
      InputProps={isPassword ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
            >
              {type === 'text' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  isPassword: PropTypes.bool.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
