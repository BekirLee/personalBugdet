import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIncomes,
  addIncome,
  deleteIncome,
  updateIncome,
} from "../features/income/incomeSlice";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // react-modal için erişim noktası

const IncomeList = () => {
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);

  const dispatch = useDispatch();
  const { incomes } = useSelector((state) => state.income);

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

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

  const openEditModal = (income) => {
    setEditingIncome(income);
    setSource(income.source);
    setCategory(income.category);
    setAmount(income.amount);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingIncome(null);
    setSource("");
    setCategory("");
    setAmount("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !amount) return;

    if (editingIncome) {
      dispatch(
        updateIncome({
          id: editingIncome._id,
          source,
          category,
          amount,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Income updated!");
          closeModal();
        })
        .catch(() => {
          toast.error("Update failed!");
        });
    } else {
      dispatch(addIncome({ source, category, amount }))
        .unwrap()
        .then(() => {
          toast.success("Income added!");
          setSource("");
          setCategory("");
          setAmount("");
        })
        .catch(() => {
          toast.error("Add failed!");
        });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Incomes</h2>

      {/* Yeni gelir ekleme formu */}
      {!modalIsOpen && (
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
      )}

      {/* Liste */}
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
              </span>{" "}
              - <span>${item.amount}</span>
              <div className="text-sm text-gray-300">
                {new Date(item.date).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openEditModal(item)}
                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
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

      {/* Düzenleme Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Income"
        className="w-100 max-w-lg mx-auto my-auto mt-80 bg-white p-6 rounded shadow-lg text-zinc-950"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
      >
        <h2 className="text-2xl mb-4">Edit Income</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default IncomeList;
