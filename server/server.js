import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportSocketIo from 'passport.socketio';

import passportConfig from './config/passport.js';

import indexRoute from './routes/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
// import chatRoutes from './routes/chats.js';

// initialize app
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_CONNECTION_URL,
});

// middleware
app.use(bodyParser.urlencoded({
  limit: '30mb',
  extended: true,
}));
app.use(bodyParser.json({
  limit: '30mb',
  extended: true,
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));

io.use(passportSocketIo.authorize({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  cookieParser,
  success: (data, accept) => {
    console.log('Authorized connection to socket.io');
    accept();
  },
  fail: (data, message, error, accept) => {
    console.log('Unauthorized connection to socket.io:', message);
    accept();
  },
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

mongoose.connect(
  process.env.DB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Mongoose is connected'),
);

app.use(indexRoute);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  console.log('Socket request:', socket.request.user);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Start up the server
httpServer.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
