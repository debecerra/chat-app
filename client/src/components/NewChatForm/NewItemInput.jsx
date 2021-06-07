/**
 * Text fields for NewChatForm component.
 */

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import useStyles from './styles';

/**
 * A input component used for submitting new items.
 */
const Input = (props) => {
  const {
    name, label, value, type, handleChange, onAddItem,
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
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onAddItem}>
              <AddCircleIcon />
            </IconButton>
          </InputAdornment>
        ),
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
  onAddItem: PropTypes.func.isRequired,
};

export default Input;
