import { AUTHENTICATE, LOGOUT, FETCH_USER_DATA } from '../constants/actionTypes';

const currentUser = (state = { user: null, loggedIn: false }, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loggedIn: false,
      };
    case FETCH_USER_DATA:
      return {
        ...state,
        user: action.data.user,
        loggedIn: true,
      };
    default:
      return state;
  }
};

export default currentUser;
