import socket from '../../services/socket';

/**
 * Emit an event to create a new chat
 * @param form the form data to create the chat
 * @param callback the function to be called once the request has completed
 */
export const emitCreateChat = (form, callback) => socket.emit('chat:create', form, callback);

/**
 * Emit an event to read all chats for a given user
 * @param callback the function to be called once the request has completed
 */
export const emitGetUserChats = (callback) => socket.emit('chat:read', callback);

/**
 * Emit an event to update an existing chat
 * @param form the form data to update the chat
 * @param callback the function to be called once the request has completed
 */
export const emitUpdateChat = (form, callback) => socket.emit('chat:update', form, callback);

/**
 * Emit an event to leave a chat
 * @param form the form data to update the chat
 * @param callback the function to be called once the request has completed
 */
export const emitLeaveChat = (chatId, callback) => socket.emit('chat:delete', chatId, callback);

/**
 * Handles the activation and deactivation of chat invite event listeners.
 */
export const chatInviteListener = {
  /**
   * Events that are currently being listened for
   */
  events: [],

  /**
   * Adds a chat invite event for a given user
   * @param user the user for which to create the event listener
   * @param callback the function to be called when a chat invite event is received
   */
  on: (user, callback) => {
    socket.on(`chat-invite:${user.email}`, callback);
  },

  /**
   * Removes a chat invite event listener. If a user is provided, the listener is removed for
   * that single user. If no user is provided, all active event listeners will be removed.
   * @param {*} user the user for which the event listener must be removed
   */
  off: (user) => {
    if (user) {
      chatInviteListener.events = chatInviteListener.events.filter((event) => `chat-invite:${user?.email}` !== event);
      socket.off(`chat-invite:${user?.email}`);
    } else {
      chatInviteListener.events.forEach((event) => {
        socket.off(event);
      });
      chatInviteListener.events = [];
    }
  },
};
