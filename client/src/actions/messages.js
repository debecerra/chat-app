/**
 * Contains redux actions relating to chat messages.
 */

import * as socket from '../api/sockets/messages';

import {
  CREATE_MESSAGE,
  GET_MESSAGES,
} from '../constants/actionTypes';

/**
 * Returns an action function that tells the server to create a new message in a chat.
 * @param {string} chatId The ID of the chat to create the new message
 * @param {string} body The text content of the message
 * @param {string} author The email of the user who wrote the message
 */
export const createMessage = (chatId, body, author) => async (dispatch) => {
  const payload = { chatId, body, author };
  socket.emitCreateMessage(payload, (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: CREATE_MESSAGE, data: result.doc });
  });
};

/**
 * Returns an action function that fetches all messages in a given chat.
 * @param {string} chatId The ID of the chat
 */
export const getMessages = (chatId) => async (dispatch) => {
  const payload = { chatId };
  socket.emitReadMessages(payload, (result) => {
    console.log(result);
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: GET_MESSAGES, data: result.messages });
  });
};
