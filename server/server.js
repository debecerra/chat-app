import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

import passportConfig from './config/passport.js';
import databaseConfig from './config/database.js';

import sessionMiddleware from './middleware/session.js';

import indexRoute from './routes/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

import registerChatHandlers from './sockets/chats.js';

const CORS_OPTIONS = {
  origin: process.env.ORIGIN,
  credentials: true,
};

// initialize app
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: CORS_OPTIONS });

// initialize middleware for express app
app.use(cors(CORS_OPTIONS));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// initialize middleware for socket.io
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

passportConfig(passport);
databaseConfig();

app.use(indexRoute);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  console.log('Socket request:', socket.request.user);
  const connections = [];
  io.sockets.sockets.forEach((value, key) => {
    if (value.request.user) {
      const { email } = value.request.user;
      connections.push([email, key]);
    }
  });
  console.log(connections);
  registerChatHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Start up the server
httpServer.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
