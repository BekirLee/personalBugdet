import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../features/expense/expenseSlice";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setCategory(expense.category);
    setAmount(expense.amount);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingExpense(null);
    setCategory("");
    setAmount("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) return;

    if (editingExpense) {
      dispatch(updateExpense({ id: editingExpense._id, category, amount }))
        .unwrap()
        .then(() => {
          toast.success("Expense updated!");
          closeModal();
        })
        .catch(() => {
          toast.error("Update failed!");
        });
    } else {
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
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Expenses</h2>
      {!modalIsOpen && (
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
      )}
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
              <div className="text-sm text-gray-300">
                {new Date(item.date).toLocaleDateString()}
              </div>
              <button
                onClick={() => openEditModal(item)}
                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Expense"
        className="w-100 max-w-lg mx-auto my-auto mt-80 bg-white p-6 rounded shadow-lg text-zinc-950"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
      >
        <h2 className="text-2xl mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded border border-gray-300"
            required
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            type="number"
            className="p-2 rounded border border-gray-300"
            required
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExpenseList;
