import {
  CREATE_CHAT,
  GET_CHATS,
  UPDATE_CHAT,
  LEAVE_CHAT,
  SELECT_ACTIVE_CHAT,
} from '../constants/actionTypes';

const chats = (state = { all: [], active: null }, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      return {
        ...state,
        all: [...state.all, action.data],
      };
    case GET_CHATS:
      return {
        ...state,
        all: [...action.data],
      };
    case UPDATE_CHAT:
      return state;
    case LEAVE_CHAT:
      return state;
    case SELECT_ACTIVE_CHAT:
      return {
        ...state,
        active: action.data,
      };
    default:
      return state;
  }
};

export default chats;
