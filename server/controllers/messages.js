/**
 * Defines handler functions for message socket events.
 */

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
 * Creates a message given a client payload.
 *
 * @param {object} payload The data received from the client
 * @param {function} callback The acknowledgment function used to send response to the client
 */
export async function createMessage(payload, callback) {
  const socket = this;

  // exit if callback if not a function
  if (typeof callback !== 'function') return;

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
        const newMessageDoc = chat.messages[chat.messages.length - 1];
        callback({
          status: 'OK',
          doc: newMessageDoc,
        });

        // send created message to all chat participants
        console.log('Sending message to', chatId);
        socket.broadcast.emit(`new-message:${chatId}`, newMessageDoc);
      }
    });
  }
}

/**
 * Reads all messages in a given chat.
 *
 * @param {object} payload The data received from the client
 * @param {function} callback The acknowledgment function used to send response to the client
 */
export async function readMessage(payload, callback) {
  const socket = this;
  const user = socket?.request?.user;

  // exit if callback if not a function
  if (typeof callback !== 'function') return;

  if (!user) {
    callback({ status: 'ERROR', error: 'Client is not authenticated' });
    return;
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

// TODO
export async function updateMessage() {
  return null;
}

// TODO
export async function deleteMessage() {
  return null;
}
