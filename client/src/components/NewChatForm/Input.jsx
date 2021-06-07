/**
 * Text fields for NewChatForm component.
 */

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

/**
 * A generic input component that composes NewChatForm.
 */
const Input = (props) => {
  const {
    name, label, value, type, handleChange,
  } = props;

  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      name={name}
      label={label}
      value={value}
      type={type}
      fullWidth
      onChange={handleChange}
      InputProps={{
        inputProps: {
          autocomplete: 'new-password',
          form: {
            autocomplete: 'off',
          },
        },
      }}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
