import io from 'socket.io-client';

const SOCKET_URL = process.env.API_ENDPOINT;
const options = {
  withCredentials: true,
};

const socket = io(SOCKET_URL, options);

export default socket;
