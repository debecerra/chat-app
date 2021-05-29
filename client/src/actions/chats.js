import socket from '../services/socket';

import { CREATE_CHAT } from '../constants/actionTypes';

/**
 * Returns an action that makes the request to register a new user.
 * @returns the action function
 */
export const createChat = (chatData) => async (dispatch) => {
  try {
    socket.emit('chat:create', chatData, (result) => {
      console.log(result);
    });
    dispatch({ type: CREATE_CHAT });
  } catch (error) {
    console.log(error);
  }
};

export const readChat = () => { };
