import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';

import useStyles from './styles';

const ParticpantList = ({ userEmails, onEmailDelete }) => {
  const classes = useStyles();

  return (
    <div>
      {userEmails.map((email) => (
        <Chip
          className={classes.chip}
          label={email}
          onDelete={() => onEmailDelete(email)}
        />
      ))}
    </div>
  );
};

ParticpantList.propTypes = {
  userEmails: PropTypes.arrayOf(PropTypes.string),
  onEmailDelete: PropTypes.func,
};

ParticpantList.defaultProps = {
  userEmails: [],
  onEmailDelete: null,
};

export default ParticpantList;
