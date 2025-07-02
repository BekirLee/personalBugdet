import Expense from "../models/Expense.js";

// import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  const { start, end } = req.query;
  const query = { user: req.user.id };

  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    query.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const expenses = await Expense.find(query);
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
  res.json({ message: "Expense deleted" });
};
