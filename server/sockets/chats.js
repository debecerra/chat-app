import {
  createChat,
  readChat,
  updateChat,
  deleteChat,
} from '../controllers/chats.js';

const registerChatHandlers = (io, socket) => {
  socket.on('chat:create', createChat);
  socket.on('chat:read', readChat);
  socket.on('chat:update', updateChat);
  socket.on('chat:delete', deleteChat);
};

export default registerChatHandlers;
