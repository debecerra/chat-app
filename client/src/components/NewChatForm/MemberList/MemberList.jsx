import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';

import useStyles from './styles';

/**
 * Component that contains a collection of Chips with the emails of chat room members.
 */
const MemberList = ({ userEmails, onEmailDelete }) => {
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

MemberList.propTypes = {
  userEmails: PropTypes.arrayOf(PropTypes.string),
  onEmailDelete: PropTypes.func,
};

MemberList.defaultProps = {
  userEmails: [],
  onEmailDelete: null,
};

export default MemberList;
