import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount:   { type: Number, required: true },
  date:     { type: Date, default: Date.now },
}, { timestamps: true });

const Expense = mongoose.model('Expense', ExpenseSchema);
export default Expense;
