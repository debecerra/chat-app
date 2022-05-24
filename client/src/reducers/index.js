import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import chats from './chats';
import messages from './messages';

// combine all reducers
const appReducer = combineReducers({ auth, chats, messages });

// is LOGOUT action, reinitialize all reducers
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
