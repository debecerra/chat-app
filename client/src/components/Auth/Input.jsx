import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField, InputAdornment, IconButton,
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
  type: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  isPassword: PropTypes.bool,
  handleClickShowPassword: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  autoFocus: false,
  isPassword: false,
  handleClickShowPassword: () => console.log('handleClickShowPassword is not defined'),
};

export default Input;
