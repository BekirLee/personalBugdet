import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIncomes,
  addIncome,
  deleteIncome,
} from "../features/income/incomeSlice";

const categoryColors = {
  Salary: "bg-green-700",
  Freelance: "bg-blue-700",
  Investment: "bg-purple-700",
  Other: "bg-gray-700",
};

const badgeColors = {
  Salary: "bg-green-600",
  Freelance: "bg-blue-600",
  Investment: "bg-purple-600",
  Other: "bg-gray-600",
};

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
    if (!source || !amount) return;
    dispatch(addIncome({ source, category, amount }))
      .unwrap()
      .then(() => {
        toast.success("Added!");
        setSource("");
        setCategory("");
        setAmount("");
      })
      .catch(() => {
        toast.error("Xıta gəlirdə!");
      });
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded border border-gray-300"
        >
          <option value="" style={{ background: "gray" }}>
            Select Category
          </option>
          <option value="Salary" style={{ background: "gray" }}>
            Salary
          </option>
          <option value="Freelance" style={{ background: "gray" }}>
            Freelance
          </option>
          <option value="Investment" style={{ background: "gray" }}>
            Investment
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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Income
        </button>
      </form>

      <ul>
        {incomes.map((item) => (
          <li
            key={item._id}
            className={`mb-2 p-3 rounded flex items-center justify-between ${
              categoryColors[item.category] || "bg-gray-800"
            }`}
          >
            <div>
              <span className="font-semibold">{item.source}</span>{" "}
              <span
                className={`text-xs text-white px-2 py-1 rounded ml-2 ${
                  badgeColors[item.category] || "bg-gray-600"
                }`}
              >
                {item.category || "No category"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={
                  Number(item.amount) >= 0
                    ? "text-green-300 font-semibold"
                    : "text-red-400 font-semibold"
                }
              >
                ${item.amount}
              </span>
              <button
                onClick={() => dispatch(deleteIncome(item._id))}
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

export default IncomeList;
