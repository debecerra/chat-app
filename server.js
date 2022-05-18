import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import path from 'path';

import passportConfig from './server/config/passport.js';
import databaseConfig from './server/config/database.js';

import sessionMiddleware from './server/middleware/session.js';

import indexRoute from './server/routes/index.js';
import authRoutes from './server/routes/auth.js';
import userRoutes from './server/routes/users.js';

import registerChatHandlers from './server/sockets/chats.js';
import registerMessageHandlers from './server/sockets/messages.js';

const CORS_OPTIONS = {
  origin: process.env.CLIENT_ENDPOINT,
  credentials: true,
};

// initialize app
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: CORS_OPTIONS });

// initialize middleware for express
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

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

/* Roadside Coder, https://www.youtube.com/channel/UCIPZVAwDGa-A4ZJxCBvXRuQ,
 * Deploying MERN Stack App to Heroku - MERN Stack Chat App with Socket.IO #17, 
 * https://www.youtube.com/watch?v=7cfnH1jhj00&t=263s, 2021-12-08
 */
if (process.env.NODE_ENV === 'production') {
  // set up static React build if running in production
  console.log("Starting production server with static React build");
  const __dirname = path.resolve();
  app.use(express.static('./client/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  // run the web application in development environment
  console.log("Starting development server");
  app.use(indexRoute);
}

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
  registerMessageHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Start up the server
httpServer.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
