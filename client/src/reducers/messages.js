import {
  CREATE_MESSAGE,
  GET_MESSAGES,
} from '../constants/actionTypes';

const messages = (state = { all: [] }, action) => {
  switch (action.type) {
    // add a new message to the state
    case CREATE_MESSAGE:
      return {
        all: [action.data, ...state.all],
      };

    // replace all messages in state
    case GET_MESSAGES:
      return {
        all: action.data,
      };

    default:
      return state;
  }
};

export default messages;
