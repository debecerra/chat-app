import socket from '../services/socket';

import { CREATE_CHAT } from '../constants/actionTypes';

/**
 * Returns an action that makes sends a message to the server to create a new chat.
 * @returns the action function
 */
export const createChat = (chatData) => async (dispatch) => {
  socket.emit('chat:create', chatData, (result) => {
    if (result.error) {
      console.log(result.error);
    } else {
      dispatch({ type: CREATE_CHAT, data: chatData });
    }
  });
};

export const readChat = () => { };

export const updateChat = () => { };

export const deleteChat = () => { };
