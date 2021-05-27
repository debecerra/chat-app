import express from 'express';

import { ensureAuthenticated, validateChatPermissions } from '../middleware/auth.js';
import {
  getMessages, createMessage, updateMessage, deleteMessage,
} from '../controllers/messages.js';

const router = express.Router();

router.get('/', ensureAuthenticated, validateChatPermissions, getMessages);
router.post('/', ensureAuthenticated, validateChatPermissions, createMessage);
router.patch('/:messageId', ensureAuthenticated, validateChatPermissions, updateMessage);
router.delete('/:messageId', ensureAuthenticated, validateChatPermissions, deleteMessage);

export default router;
