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

// PUT /api/income/:id
export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { source, category, amount } = req.body;

  const income = await Income.findById(id);
  if (!income) return res.status(404).json({ message: "Income not found" });

  // İzin kontrolü - kullanıcı sadece kendi gelirini değiştirebilmeli
  if (income.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  income.source = source;
  income.category = category;
  income.amount = amount;

  const updated = await income.save();
  res.json(updated);
};
