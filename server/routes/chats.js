import express from 'express';

import { ensureAuthenticated, validateChatPermissions } from '../middleware/auth.js';
import {
  getChats, getChatById, createChat, updateChat, deleteChat,
} from '../controllers/chats.js';

const router = express.Router();

router.get('/', ensureAuthenticated, getChats);
router.get('/:chatId', ensureAuthenticated, validateChatPermissions, getChatById);
router.post('/', ensureAuthenticated, createChat);
router.patch('/:chatId', ensureAuthenticated, validateChatPermissions, updateChat);
router.delete('/:chatId', ensureAuthenticated, validateChatPermissions, deleteChat);

export default router;
