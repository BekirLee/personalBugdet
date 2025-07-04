import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
} from "../features/expense/expenseSlice";
import { toast } from "react-toastify";

const categoryColors = {
  Food: "bg-red-700",
  Transport: "bg-yellow-700",
  Shopping: "bg-pink-700",
  Other: "bg-gray-700",
};

const badgeColors = {
  Food: "bg-red-600",
  Transport: "bg-yellow-600",
  Shopping: "bg-pink-600",
  Other: "bg-gray-600",
};

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
    dispatch(addExpense({ category, amount }))
      .unwrap()
      .then(() => {
        toast.success("Added!");
        setCategory("");
        setAmount("");
      })
      .catch(() => {
        toast.error("Error adding expense!");
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Expenses</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded border border-gray-300"
          required
        >
          <option value="" style={{ background: "gray" }}>
            Select Category
          </option>
          <option value="Food" style={{ background: "gray" }}>
            Food
          </option>
          <option value="Transport" style={{ background: "gray" }}>
            Transport
          </option>
          <option value="Shopping" style={{ background: "gray" }}>
            Shopping
          </option>
          <option value="Other" style={{ background: "gray" }}>
            Other
          </option>
        </select>
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
          <li
            key={item._id}
            className={`mb-2 p-3 rounded flex items-center justify-between ${
              categoryColors[item.category] || "bg-gray-800"
            }`}
          >
            <div>
              <span className="font-semibold">{item.category}</span>{" "}
              <span
                className={`text-xs text-white px-2 py-1 rounded ml-2 ${
                  badgeColors[item.category] || "bg-gray-600"
                }`}
              >
                {item.category}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-red-300 font-semibold">${item.amount}</span>
              <button
                onClick={() => dispatch(deleteExpense(item._id))}
                className="text-red-300 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
