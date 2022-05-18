/**
 * Defines handler functions for chat socket events.
 */

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
 * Create a chat object given a client payload.
 *
 * @param {object} payload The data received from the client
 * @param {function} callback The acknowledgment function used to send response to the client
 */
export async function createChat(payload, callback) {
  const socket = this;
  const user = socket?.request?.user;

  // exit if callback if not a function
  if (typeof callback !== 'function') return;

  if (!user) {
    callback({ status: 'ERROR', error: 'Client is not authenticated' });
    return;
  }

  const { error, value } = chatSchema.validate(payload);

  if (error) {
    // handle error
    callback({
      status: 'ERROR',
      error,
    });
  } else {
    // create the new Chat document
    const members = value.members.map((email) => ({ email, admin: false }));
    members.unshift({ email: user.email, admin: true });
    const newChat = new Chat({
      name: value.name,
      creator: user.email,
      members,
    });

    await newChat.save((err, doc) => {
      if (err) {
        // handle error
        callback({
          status: 'ERROR',
          error: err,
        });
      } else {
        // send created document to client
        callback({
          status: 'OK',
          doc,
        });
      }
    });

    // payload.members.forEach((member) => {
    //   console.log('Sending invite to', member.email);
    //   socket.broadcast.emit(`chat-invite:${member.email}`, 'Hello');
    // });
  }
}

/**
 * Get the list of chats available to client.
 *
 * @param {function} callback The acknowledgment function used to send response to the client
 */
export async function readChat(callback) {
  const socket = this;
  const user = socket?.request?.user;

  // exit if callback if not a function
  if (typeof callback !== 'function') return;

  if (!user) {
    callback({
      status: 'ERROR',
      error: 'Client is not authenticated',
    });
    return;
  }

  // find all chats available to the user
  const { email } = socket.request.user;
  Chat.find({ 'members.email': email }, (err, chats) => {
    callback({
      status: 'OK',
      chats,
    });
  });
}

// TODO
export async function updateChat() {
  return null;
}

// TODO
export async function deleteChat() {
  return null;
}
