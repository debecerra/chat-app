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
 * @param payload The data received from the client
 * @param callback The acknowledgment function to send a response to the client
 */
export async function createMessage(payload, callback) {
  const socket = this;

  if (typeof callback !== 'function') {
    // not an acknowledgement
    socket.disconnect();
  }

  const { error, value } = messageSchema.validate(payload);

  if (error) {
    // handle error
    callback({
      status: 'ERROR',
      error,
    });
  } else {
    const { body, author, chatId } = value;
    const newMessage = { body, author };

    const update = { $push: { messages: newMessage } };
    Chat.findByIdAndUpdate(chatId, update, { new: true }, (err, chat) => {
      if (err) {
        // handle error
        callback({
          status: 'ERROR',
          error: err,
        });
      } else {
        // send created message document (most recent) to client
        callback({
          status: 'OK',
          doc: chat.messages[chat.messages.length - 1],
        });
      }
    });
  }
}

/**
 * Reads all messages in a given chat
 * @param {object} payload The data received from the client
 * @param {function} callback The acknowledgement function to send a response to the client
 */
export async function readMessage(payload, callback) {
  const socket = this;

  if (typeof callback !== 'function') {
    // not an acknowledgement
    socket.disconnect();
  }

  const { chatId } = payload;

  Chat.findById(chatId, (err, chat) => {
    if (err) {
      // handle error
      callback({
        status: 'ERROR',
        error: err,
      });
    } else {
      // send chat messages to client
      const messages = chat ? chat.messages : [];
      messages.reverse();
      callback({
        status: 'OK',
        messages,
      });
    }
  });
}

export async function updateMessage() {
  return null;
}

export async function deleteMessage() {
  return null;
}
