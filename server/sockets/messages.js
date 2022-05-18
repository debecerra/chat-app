/**
 * Registers event handlers for message socket events.
 */

import {
  createMessage,
  readMessage,
} from '../controllers/messages.js';

const registerMessageHandlers = (io, socket) => {
  socket.on('message:create', createMessage);
  socket.on('message:read', readMessage);
};

export default registerMessageHandlers;
