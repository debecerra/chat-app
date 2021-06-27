import Joi from 'joi';

import Chat from '../models/chat.js';

const chatSchema = Joi.object({
  name: Joi.string().required(),
  members: Joi.array().items(Joi.string().email()),
});

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

  const { name } = value;
  const memberEmails = value.members;

  const creator = user.email;
  const members = memberEmails.map((email) => ({ email, admin: false }));
  members.unshift({ email: creator, admin: true });

  const newChat = new Chat({ name, creator, members });
  await newChat.save();

  // payload.members.forEach((member) => {
  //   console.log('Sending invite to', member.email);
  //   socket.broadcast.emit(`chat-invite:${member.email}`, 'You have been invited to join a chat');
  // });

  callback({ status: 'OK' });
}

export async function readChat(callback) {
  const socket = this;
  const { email } = socket?.request?.user;
  if (!email) {
    callback({ status: 'ERROR', error: 'Client is not authenticated' });
  } else {
    Chat.find({ 'members.email': email }, (err, chats) => {
      console.log(JSON.stringify(chats, null, 2));
      callback({ status: 'OK', chats });
    });
  }
}

export const updateChat = () => {
  // const socket = this;
};

export const deleteChat = () => {
  // const socket = this;
};
