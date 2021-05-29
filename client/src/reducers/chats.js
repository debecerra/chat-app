import {
  CREATE_CHAT,
  GET_CHATS,
  UPDATE_CHAT,
  LEAVE_CHAT,
} from '../constants/actionTypes';

const chats = (state = [], action) => {
  switch (action.type) {
    case CREATE_CHAT:
      return [...state, action.data];
    case GET_CHATS:
      return [...state];
    case UPDATE_CHAT:
      return [...state];
    case LEAVE_CHAT:
      return [...state];
    default:
      return state;
  }
};

export default chats;
