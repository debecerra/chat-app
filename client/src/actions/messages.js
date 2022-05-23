/**
 * Contains thunk action creators relating to chat messages.
 */

import * as MessagesAPI from '../api/sockets/messages';

import {
  CREATE_MESSAGE,
  GET_MESSAGES,
  RECEIVE_MESSAGE,
} from '../constants/actionTypes';

/**
 * Thunk action creator that returns thunk function that creates and sends a new
 * message to a chat.
 *
 * @param {string} chatId The ID of the chat to create the new message
 * @param {string} body The text content of the message
 * @param {string} author The email of the user who wrote the message
 */
export const createMessage = (chatId, body, author) => async (dispatch) => {
  const payload = { chatId, body, author };
  MessagesAPI.emitCreateMessage(payload, (result) => {
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: CREATE_MESSAGE, data: result.doc });
  });
};

/**
 * Thunk action creator that returns thunk function that subscribes to all new
 * messages in a chat. Adds a listener to new message events and updates the
 * message state when an event is received.
 *
 * @param {string} chatId The ID of the chat to subscribe to.
 */
export const subscribeToMessages = (chatId) => async (dispatch) => {
  MessagesAPI.startMessageListener(chatId, (newMessage) => {
    dispatch({ type: RECEIVE_MESSAGE, data: newMessage });
  });
};

/**
 * Unsubscribes from new messages in a chat. Removes the listener to new message
 * events for the chat.
 *
 * @param {string} chatId The ID of the chat to unsubscribe from.
 */
export const unsubscribeFromMessages = (chatId) => {
  MessagesAPI.stopMessageListener(chatId);
};

/**
 * Thunk action creator that returns thunk function that fetches all messages
 * in a chat.
 *
 * @param {string} chatId The ID of the chat
 */
export const getMessages = (chatId) => async (dispatch) => {
  const payload = { chatId };
  MessagesAPI.emitReadMessages(payload, (result) => {
    console.log(result);
    if (result.error) {
      console.log(result.error);
      return;
    }
    dispatch({ type: GET_MESSAGES, data: result.messages });
  });
};
