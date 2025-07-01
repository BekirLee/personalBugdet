// Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IncomeList from "../components/IncomeList";
import ExpenseList from "../components/ExpenseList";
import Layout from "../components/Layout";
import { fetchIncomes } from "../features/income/incomeSlice";
import { fetchExpenses } from "../features/expense/expenseSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchIncomes());
      dispatch(fetchExpenses());
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-[#161f2c] text-[#f9fafb] p-6">
      <Layout />
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-semibold mb-8 text-center tracking-wide">
          Personal Budget Dashboard
        </h1>
        <div className="max-w-6xl mx-auto p-4">
          <div className="grid grid-cols-2 gap-8">
            <IncomeList />
            <ExpenseList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
