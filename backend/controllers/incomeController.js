import Income from "../models/Income.js";

export const getIncomes = async (req, res) => {
  const incomes = await Income.find({ user: req.user.id });
  res.json(incomes);
};

export const addIncome = async (req, res) => {
  const { source, category, amount } = req.body;

  const income = new Income({
    user: req.user.id,
    source,
    category, // body’den alıyoruz
    amount,
  });

  const saved = await income.save();
  res.status(201).json(saved);
};

export const deleteIncome = async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ message: "Income deleted" });
};
