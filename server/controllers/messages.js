/* eslint-disable no-unused-vars */
import Joi from 'joi';

import Chat from '../models/chat.js';

/**
 * Schema for message data payload
 * */
const messageSchema = Joi.object({
  body: Joi.string().required(),
  author: Joi.string().email().required(),
  chatId: Joi.string().required(),
});

/**
 * Creates a message given a client payload
 * @param payload data received from the client
 * @param callback acknowledgment function to send a response to the client */
export async function createMessage(payload, callback) {
  const socket = this;
  const { user } = socket.request;

  if (typeof callback !== 'function') {
    // not an acknowledgement
    socket.disconnect();
  }

  const { error, value } = messageSchema.validate(payload);

  if (error) {
    // error
    callback({
      status: 'ERROR',
      error,
    });
  } else {
    const { body, author, chatId } = value;
    const newMessage = { body, author };

    const update = { $push: { messages: newMessage } };
    Chat.findByIdAndUpdate(chatId, update, (err, doc) => {
      if (err) {
        // error
        callback({
          status: 'ERROR',
          error: err,
        });
      } else {
        // send new message document to client
        callback({
          status: 'OK',
          object: newMessage,
        });
      }
    });
  }
}

export async function readMessage() {
  return null;
}

export async function updateMessage() {
  return null;
}

export async function deleteMessage() {
  return null;
}
