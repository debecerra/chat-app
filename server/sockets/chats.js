/**
 * Registers event handlers for chat socket events.
 */

import {
  createChat,
  readChat,
} from '../controllers/chats.js';

const registerChatHandlers = (io, socket) => {
  socket.on('chat:create', createChat);
  socket.on('chat:read', readChat);
};

export default registerChatHandlers;
