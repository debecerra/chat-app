import { combineReducers } from 'redux';

import auth from './auth';
import chats from './chats';

// combine all reducers
const appReducer = combineReducers({ auth, chats });

// is LOGOUT action, reinitialize all reducers
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // do I need this to clear localStorage in reduc-persist?
    // localStorage.removeItem('persist:root');
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
