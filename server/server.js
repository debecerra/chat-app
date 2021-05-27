import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';

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
    methods: ['GET', 'POST'],
    credentials: true,
  },
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
  store: MongoStore.create({
    mongoUrl: process.env.DB_CONNECTION_URL,
  }),
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

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Start up the server
httpServer.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
