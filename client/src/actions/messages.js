/**
 * Contains redux actions relating to chat messages.
 */

import * as socket from '../api/sockets/messages';

import {
  CREATE_MESSAGE,
  GET_MESSAGES,
  RECEIVE_MESSAGE,
} from '../constants/actionTypes';

/**
 * Dispatch function that sends a new message to the chat and adds the new message
 * to the message state.
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
 * Dispatch function that subscribes to all new messages in a chat. Adds a listener to new message
 * events and updates the message state when an event is received.
 * @param {string} chatId The ID of the chat to subscribe to.
 */
export const subscribeToMessages = (chatId) => async (dispatch) => {
  socket.startMessageListener(chatId, (newMessage) => {
    console.log('Received a message in chat ', chatId);
    console.log(newMessage);
    dispatch({ type: RECEIVE_MESSAGE, data: newMessage });
  });
};

/**
 * Unsubscribes from new messages in a chat. Removes the listener to new message events for
 * the chat.
 * @param {string} chatId The ID of the chat to unsubscribe from.
 */
export const unsubscribeFromMessages = (chatId) => {
  socket.stopMessageListener(chatId);
};

/**
 * Dispatch function that fetches all messages in a chat and sets the messages to the message state.
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
