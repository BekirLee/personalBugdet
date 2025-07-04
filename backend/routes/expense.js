import express from 'express';
import { getExpenses, addExpense, deleteExpense, updateExpense } from '../controllers/exprenseController.js';
import auth from '../middleware/authMiddleware.js';
// import { updateExpense } from '../../frontend/src/features/expense/expenseSlice.js';

const router = express.Router();

router.get('/', auth, getExpenses);
router.post('/', auth, addExpense);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

export default router;
