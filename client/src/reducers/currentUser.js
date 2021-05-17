import { AUTH, LOGOUT } from '../constants/actionTypes';

const currentUser = (state = { user: null }, action) => {
  console.log(action?.data?.user);
  switch (action.type) {
    case AUTH:
      console.log('user authed');
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
