import Income from "../models/Income.js";

export const getIncomes = async (req, res) => {
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

  const incomes = await Income.find(query);
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
