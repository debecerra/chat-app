/**
 * Defines Router for index routes. These routes are only intended to be active
 * when server in run in development.
 */

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the Chat App API');
});

export default router;
