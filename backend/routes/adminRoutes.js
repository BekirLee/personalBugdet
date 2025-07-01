import express from 'express';
// import { requireAuth } from '../middleware/requireAuth.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { getUsers, getIncomes, getExpenses } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', authMiddleware, requireAdmin, getUsers);
router.get('/incomes', authMiddleware, requireAdmin, getIncomes);
router.get('/expenses', authMiddleware, requireAdmin, getExpenses);

export default router;
  