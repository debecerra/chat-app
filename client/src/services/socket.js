import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';
const options = {
  withCredentials: true,
};

const socket = io(SOCKET_URL, options);

export default socket;
