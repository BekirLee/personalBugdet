import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.json(expenses);
};

export const addExpense = async (req, res) => {
  const { category, amount } = req.body;

  const expense = new Expense({
    user: req.user.id,
    category,
    amount,
  });

  const saved = await expense.save();
  res.status(201).json(saved);
};

export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted' });
};
