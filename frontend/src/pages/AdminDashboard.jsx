import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [incomeSearch, setIncomeSearch] = useState("");
  const [expenseSearch, setExpenseSearch] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [userRes, incomeRes, expenseRes] = await Promise.all([
          axios.get("/api/admin/users", { headers }),
          axios.get("/api/admin/incomes", { headers }),
          axios.get("/api/admin/expenses", { headers }),
        ]);
        setUsers(userRes.data);
        setIncomes(incomeRes.data);
        setExpenses(expenseRes.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };
    if (token) fetchData();
  }, [token]);

  const filteredIncomes = (
    selectedUserId
      ? incomes.filter((i) => i.user?._id === selectedUserId)
      : incomes
  ).filter((i) => i.source.toLowerCase().includes(incomeSearch.toLowerCase()));

  const filteredExpenses = (
    selectedUserId
      ? expenses.filter((e) => e.user?._id === selectedUserId)
      : expenses
  ).filter((e) =>
    e.category.toLowerCase().includes(expenseSearch.toLowerCase())
  );

  const totalIncome = filteredIncomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = filteredExpenses.reduce((s, e) => s + e.amount, 0);

  const incomeColumns = [
    { name: "Source", selector: (row) => row.source, sortable: true },
    {
      name: "Category",
      selector: (row) => row.category || "-",
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => `${row.amount} $`,
      sortable: true,
      right: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  const expenseColumns = [
    { name: "Category", selector: (row) => row.category, sortable: true },
    {
      name: "Total",
      selector: (row) => `${row.amount} $`,
      sortable: true,
      right: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col scrollbar-hide">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 ">
        <AdminSidebar isOpen={isSidebarOpen} />

        <main
          className={`flex-1 transition-all duration-300 p-6 overflow-y-auto no-scrollbar pt-20 ${
            isSidebarOpen ? "md:ml-4" : "md:ml-0"
          }`}
          style={{ height: "calc(100vh - 56px)" }}
        >
          <h1 className="text-3xl font-bold mb-6"> Admin Panel</h1>
          <div className="mb-6">
            <label className="font-semibold block mb-2" htmlFor="user-select">
              Choose user:
            </label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full md:w-64 border rounded p-2"
            >
              <option value="" className="bg-gray-800 ">
                All users
              </option>
              {users
                .filter((u) => u.role !== "admin")
                .map((u) => (
                  <option className="bg-gray-800 " key={u._id} value={u._id}>
                    {u.email}
                  </option>
                ))}
            </select>
          </div>

          <section className="mb-10 p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold mb-2 text-green-700">
              İncomes
            </h2>
            <input
              type="text"
              placeholder="Search (source)"
              className="mb-4 p-2 border rounded w-full md:w-64 bg-green-100 text-black"
              value={incomeSearch}
              onChange={(e) => setIncomeSearch(e.target.value)}
            />
            <DataTable
              columns={incomeColumns}
              data={filteredIncomes}
              pagination
              highlightOnHover
              responsive
            />
          </section>

          <section className="p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold mb-2 text-red-700">
              Expenses
            </h2>
            <input
              type="text"
              placeholder="Search (category)"
              className="mb-4 p-2 border rounded w-full md:w-64  bg-green-100 text-black"
              value={expenseSearch}
              onChange={(e) => setExpenseSearch(e.target.value)}
            />
            <DataTable
              columns={expenseColumns}
              data={filteredExpenses}
              pagination
              highlightOnHover
              responsive
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
