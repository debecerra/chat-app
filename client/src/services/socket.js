import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL;
const options = {
  withCredentials: true,
};

const socket = io(SOCKET_URL, options);

export default socket;
