/**
 * Text fields for NewChatForm component.
 */

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import useStyles from '../styles';

/**
 * A input component used for submitting new items.
 */
const Input = (props) => {
  const {
    name, label, value, type, handleChange, onAddItem,
  } = props;

  const classes = useStyles();

  /**
   * Triggers onAddItem function when Enter key is pressed
   * @param {Event} e the event that was triggered
   */
  const handleKeyDown = (e) => {
    /* MDN Web Docs, "KeyboardEvent.ctrlKey", 03-29-2021,
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey, Public Domain
     */
    if (e.key === 'Enter') {
      // Add item if Enter is clicked
      onAddItem();
    }
  };

  return (
    <TextField
      className={classes.input}
      name={name}
      label={label}
      value={value}
      type={type}
      fullWidth
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      InputProps={{
        inputProps: {
          autoComplete: 'new-password',
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
  name: PropTypes.string.isRequired, // the name of the component
  label: PropTypes.string.isRequired, // the label of the underlying TextField
  value: PropTypes.string.isRequired, // the value of the underlying TextField
  type: PropTypes.string.isRequired, // the type of the underlying TextField
  handleChange: PropTypes.func.isRequired, // function to be triggered when value is changed
  onAddItem: PropTypes.func.isRequired, // function to be triggered when add button is clicked
};

export default Input;
