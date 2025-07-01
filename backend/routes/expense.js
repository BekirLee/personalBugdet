import express from 'express';
import { getExpenses, addExpense, deleteExpense } from '../controllers/exprenseController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getExpenses);
router.post('/', auth, addExpense);
router.delete('/:id', auth, deleteExpense);

export default router;
