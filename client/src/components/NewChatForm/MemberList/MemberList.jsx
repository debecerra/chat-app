import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Chip from '@material-ui/core/Chip';

import useStyles from './styles';

/**
 * Component that contains a collection of Chips with the emails of chat room members.
 */
const MemberList = ({ userEmails, onEmailDelete }) => {
  const classes = useStyles();

  return (
    <div>
      {_.range(userEmails.length).map((num) => (
        <Chip
          key={num}
          className={classes.chip}
          label={userEmails[num]}
          onDelete={() => onEmailDelete(userEmails[num])}
        />
      ))}
    </div>
  );
};

MemberList.propTypes = {
  userEmails: PropTypes.arrayOf(PropTypes.string),
  onEmailDelete: PropTypes.func, // function to be called when an email is deleted
};

MemberList.defaultProps = {
  userEmails: [],
  onEmailDelete: null,
};

export default MemberList;
