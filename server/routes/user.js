import express from 'express';
import { getUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUser);
// router.post('/login', login);
// router.post('/google', googleLogin);
// router.post('/logout', logout);

export default router;
