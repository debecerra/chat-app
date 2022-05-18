/**
 * Contains functions for interacting with messages API.
 */

import socket from '../../services/socket';

/**
 * Emit an event to create a new message in a chat.
 * @param {object} payload The data to send to the server
 * @param {function} callback The acknowledgement to be called once the request has been completed
 */
export const emitCreateMessage = (payload, callback) => socket.emit('message:create', payload, callback);

/**
 * Emits an event to read all messages in a chat.
 * @param {object} payload The data to send to the server
 * @param {function} callback The acknowledgement to be called once the request has been completed
 */
// eslint-disable-next-line no-unused-vars
export const emitReadMessages = (payload, callback) => socket.emit('message:read', payload, callback);

/**
 * Adds a listener for new messages in a chat.
 * @param {string} chatId The ID of the chat to listen to
 * @param {function} callback The callback to run when an event is received
 */
export const startMessageListener = (chatId, callback) => socket.on(`new-message:${chatId}`, callback);

/**
 * Removes a listener for new messages in a chat.
 * @param {string} chatId The ID of the chat to listen to
 */
export const stopMessageListener = (chatId) => socket.off(`new-message:${chatId}`);
