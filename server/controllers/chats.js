import Chat from '../models/chat.js';

export async function createChat(payload, callback) {
  const socket = this;
  console.log('User:', socket.request.user);
  const newChat = new Chat({
    name: payload.name,
    creator: payload.creator,
    members: payload.members,
  });
  await newChat.save();

  payload.members.forEach((member) => {
    console.log('Sending invite to', member.email);
    socket.broadcast.emit(`chat-invite:${member.email}`, 'You have been invited to join a chat');
  });

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
