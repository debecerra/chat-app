import * as socket from '../api/sockets/chats';

import {
  CREATE_CHAT,
  GET_CHATS,
  UPDATE_CHAT,
  LEAVE_CHAT,
} from '../constants/actionTypes';

/**
 * Returns an action that makes sends a message to the server to create a new chat.
 * @returns the action function
 */
export const createChat = (chatData) => async (dispatch) => {
  socket.emitCreateChat(chatData, (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: CREATE_CHAT, data: chatData });
  });
};

export const getUserChats = () => async (dispatch) => {
  socket.emitGetUserChats((result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: GET_CHATS, data: result.chats });
  });
};

export const updateChat = (chatData) => async (dispatch) => {
  socket.emitUpdateChat(chatData, (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: UPDATE_CHAT, data: chatData });
  });
};

export const leaveChat = (chatId) => async (dispatch) => {
  socket.emitLeaveChat(chatId, (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: LEAVE_CHAT, data: chatId });
  });
};
