import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const Input = (props) => {
  const { name, label } = props;
  return (
    <TextField
      name={name}
      label={label}
      fullWidth
      required
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
