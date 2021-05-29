import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';
const options = {
  withCredentials: true,
};

export default io(SOCKET_URL, options);
