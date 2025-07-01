import User from '../models/User.js';
import Expense from '../models/Expense.js';
import Income from '../models/Income.js';

export const getUsers = async (req, res) => {
  const users = await User.find({}, 'email role');
  res.json(users);
};

export const getIncomes = async (req, res) => {
  const incomes = await Income.find().populate('user');
  res.json(incomes);
};

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find().populate('user');
  res.json(expenses);
};
