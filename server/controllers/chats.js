import Joi from 'joi';

import Chat from '../models/chat.js';

/**
 * Schema for a chat data payload
 */
const chatSchema = Joi.object({
  name: Joi.string().required(),
  members: Joi.array().items(Joi.string().email()),
});

/**
 * Creates a chat object given a client payload
 * @param payload data received from the client
 * @param callback acknowledgment function to send a response to the client
 */
export async function createChat(payload, callback) {
  const socket = this;
  const { user } = socket.request;

  if (typeof callback !== 'function') {
    // not an acknowledgement
    socket.disconnect();
  }

  const { error, value } = chatSchema.validate(payload);

  if (error) {
    callback({
      status: 'ERROR',
      error,
    });
  }

  // create the new Chat document
  const members = value.members.map((email) => ({ email, admin: false }));
  members.unshift({ email: user.email, admin: true });

  const newChat = new Chat({
    name: value.name,
    creator: user.email,
    members,
  });
  await newChat.save();

  // payload.members.forEach((member) => {
  //   console.log('Sending invite to', member.email);
  //   socket.broadcast.emit(`chat-invite:${member.email}`, 'You have been invited to join a chat');
  // });

  callback({ status: 'OK', object: newChat });
}

/**
 * Gets the list of chat objects and sends to client via an acknowledgement.
 * @param callback acknowledgment function to send a response to the client
 */
export async function readChat(callback) {
  const socket = this;

  if (socket?.request?.user === null) {
    callback({ status: 'ERROR', error: 'Client is not authenticated' });
    return;
  }

  // find all chats for the requesting user
  const { email } = socket.request.user;
  Chat.find({ 'members.email': email }, (err, chats) => {
    callback({ status: 'OK', chats });
  });
}

export const updateChat = () => {
  // const socket = this;
};

export const deleteChat = () => {
  // const socket = this;
};
