import express from 'express';
import { createEntry } from '../controllers/entryControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/journal/:journalId', verifyToken, createEntry);

export default router; 