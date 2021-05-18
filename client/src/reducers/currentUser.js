import { AUTH, LOGOUT } from '../constants/actionTypes';

const currentUser = (state = { user: null }, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.data.user,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default currentUser;
