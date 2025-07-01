import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
} from "../features/expense/expenseSlice";

const ExpenseList = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) return;
    dispatch(addExpense({ category, amount }));
    setCategory("");
    setAmount("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Expenses</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mb-4">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="p-2 rounded border border-gray-300"
          required
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          className="p-2 rounded border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Add Expense
        </button>
      </form>
      <ul>
        {expenses.map((item) => (
          <li key={item._id} className="mb-1">
            <span className="font-semibold">{item.category}</span> -{" "}
            <span>${item.amount}</span>
            <button
              onClick={() => dispatch(deleteExpense(item._id))}
              className="ml-4 text-red-600 hover:text-red-800"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
