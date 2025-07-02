// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IncomeList from "../components/IncomeList";
import ExpenseList from "../components/ExpenseList";
import Layout from "../components/Layout";
import { fetchIncomes } from "../features/income/incomeSlice";
import { fetchExpenses } from "../features/expense/expenseSlice";
import { toast } from "react-toastify";

import {
  Chart as ChartJS,
  CategoryScale, // <-- Burada category scale
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BudgetAreaChart from "../components/Apexchart";

// Bu bileşenleri kaydetmelisiniz
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Budget Overview",
    },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchIncomes());
      dispatch(fetchExpenses());
    }
  }, [token, dispatch]);

  const handleAddIncome = async (incomeData) => {
    try {
      await dispatch(addIncome(incomeData)).unwrap();
      toast.success("Gelir başarıyla eklendi!");
    } catch (error) {
      toast.error("Gelir eklenirken hata oluştu.");
    }
  };

  const handleFilter = () => {
    if (startDate && endDate) {
      dispatch(fetchIncomes({ start: startDate, end: endDate }));
      dispatch(fetchExpenses({ start: startDate, end: endDate }));
    } else {
      dispatch(fetchIncomes());
      dispatch(fetchExpenses());
    }
  };
  //
  const totalIncome = incomes.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div className="min-h-screen bg-[#161f2c] text-[#f9fafb] p-6">
      <Layout />
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-semibold mb-8 text-center tracking-wide">
          Personal Budget Dashboard
        </h1>
        {/* Tarih filtre alanı */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <input
            type="date"
            className="p-2 rounded bg-gray-700 text-white"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || undefined} // Başlangıç tarihi bitişten büyük olmasın
          />
          <input
            type="date"
            className="p-2 rounded bg-gray-700 text-white"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined} // Bitiş tarihi başlangıçtan küçük olmasın
          />
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            onClick={handleFilter}
          >
            Filtrele
          </button>
        </div>

        <div className="bg-[#1f2937] p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Overview Chart
          </h2>

          <BudgetAreaChart incomes={incomes} expenses={expenses} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <IncomeList />
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
