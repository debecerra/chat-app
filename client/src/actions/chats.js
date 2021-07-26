import * as socket from '../api/sockets/chats';

import {
  CREATE_CHAT,
  GET_CHATS,
  UPDATE_CHAT,
  LEAVE_CHAT,
  SELECT_ACTIVE_CHAT,
} from '../constants/actionTypes';

/**
 * Returns an action that makes sends a message to the server to create a new chat.
 * @param {string} name the name of the new chat
 * @param {Array<string>} memberEmails the emails of the members to add to the chat
 * @returns {function} the action function
 */
export const createChat = (name, memberEmails) => async (dispatch) => {
  const payload = { name, members: memberEmails };
  socket.emitCreateChat(payload, (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: CREATE_CHAT, data: result.doc });
  });
};

/**
 * Returns an action that makes a request to the server connection to read all chats for
 * the current user.
 * @returns the action function
 */
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

export const setActiveChat = (chat) => async (dispatch) => {
  dispatch({ type: SELECT_ACTIVE_CHAT, data: chat });
};
