import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIncomes,
  addIncome,
  deleteIncome,
} from "../features/income/incomeSlice";

const IncomeList = () => {
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { incomes } = useSelector((state) => state.income);

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !amount) return; // kaynak ve tutar olmadan ekleme yapma
    dispatch(addIncome({ source, category, amount }));
    setSource("");
    setCategory("");
    setAmount("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Incomes</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mb-4">
        <input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source"
          className="p-2 rounded border border-gray-300"
          required
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="p-2 rounded border border-gray-300"
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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Income
        </button>
      </form>
      <ul>
        {incomes.map((item) => (
          <li key={item._id} className="mb-1">
            <span className="font-semibold">{item.source}</span> -{" "}
            <span className="italic text-gray-400">
              {item.category || "No category"}
            </span>{" "}
            - <span>${item.amount}</span>
            <button
              onClick={() => dispatch(deleteIncome(item._id))}
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

export default IncomeList;
