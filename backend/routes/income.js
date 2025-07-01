import express from 'express';
import { getIncomes, addIncome, deleteIncome } from '../controllers/incomeController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getIncomes);
router.post('/', auth, addIncome);
router.delete('/:id', auth, deleteIncome);

export default router;
