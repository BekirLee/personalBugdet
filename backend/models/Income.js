import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    source: { type: String, required: true },
    category: { type: String, required: false }, // yeni kategori alanı, opsiyonel yapabiliriz
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", IncomeSchema);
export default Income;
