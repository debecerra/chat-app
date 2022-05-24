import * as ChatAPI from '../api/sockets/chats';

import {
  CREATE_CHAT,
  GET_CHATS,
  SELECT_ACTIVE_CHAT,
} from '../constants/actionTypes';

/**
 * Thunk action creator that returns thunk function that makes API request to create a new chat.
 *
 * @param {string} name the name of the new chat
 * @param {Array<string>} memberEmails the emails of the members to add to the chat
 * @returns {Function} The thunk function/action
 */
export const createChat = (name, memberEmails) => async (dispatch) => {
  const payload = { name, members: memberEmails };
  ChatAPI.emitCreateChat(payload, (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: CREATE_CHAT, data: result.doc });
  });
};

/**
 * Thunk action creator that returns thunk function that makes API request to get all chats for
 * the current user.
 *
 * @returns {Function} The thunk function/action
 */
export const getUserChats = () => async (dispatch) => {
  ChatAPI.emitGetUserChats((result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: GET_CHATS, data: result.chats });
  });
};

/**
 * Thunk action creator that returns thunk function that sets the active chat.
 *
 * @param {object} chat The chat object to set as the active chat
 * @returns {Function} The thunk function/action
 */
export const setActiveChat = (chat) => async (dispatch) => {
  dispatch({ type: SELECT_ACTIVE_CHAT, data: chat });
};
