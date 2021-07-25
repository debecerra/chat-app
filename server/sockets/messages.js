import {
  createMessage,
  readMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messages.js';

const registerMessageHandlers = (io, socket) => {
  socket.on('message:create', createMessage);
  socket.on('message:read', readMessage);
  socket.on('message:update', updateMessage);
  socket.on('message:delete', deleteMessage);
};

export default registerMessageHandlers;
