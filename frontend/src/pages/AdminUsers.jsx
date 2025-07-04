import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  // const token = useSelector((state) => state.auth.token);
  // const [incomes, setIncomes] = useState([]);
  // const [expenses, setExpenses] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/user/public-users");
        setUsers(res.data);
      } catch (err) {
        console.error("Public user fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col scrollbar-hide">
      <Navbar toggleSidebar={toggleSidebar} />

      {/* <h1 className="text-2xl font-bold mb-6">👥 Kullanıcılar</h1> */}
      <div className="flex flex-1">
        <AdminSidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1 transition-all duration-300 p-6 overflow-y-auto no-scrollbar pt-40 ${
            isSidebarOpen ? "md:ml-4" : "md:ml-0"
          }`}
          style={{ height: "calc(100vh - 56px)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              // console.log(user)

              <div
                key={user._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-black"
              >
                <h3 className="text-lg font-semibold mb-1">{user.username}</h3>
                <p className="text-sm text-black mb-2">{user.email}</p>
                <div className="text-sm space-y-1">
                  <img
                    src={"http://localhost:5000/uploads/" + user.profileImage}
                    alt=""
                    style={{ height: "40px", width: "40px" }}
                  />
                  <p>
                    <span className="font-semibold">Income:</span>{" "}
                    {user.incomeTotal} $
                  </p>
                  <p>
                    <span className="font-semibold">Expense:</span>{" "}
                    {user.expenseTotal} $
                  </p>
                  {/* <p> */}
                  {/* <span className="font-semibold">Rol:</span> {user.role} */}
                  {/* </p> */}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
