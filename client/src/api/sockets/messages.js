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
export const emitReadMessages = (payload, callback) => socket.emit('message:read', payload, callback);
