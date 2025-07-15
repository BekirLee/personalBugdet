import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminSidebar = ({ isOpen }) => {
  // const [unreadCount, setUnreadCount] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadReports = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get("/api/reports/unread-count", { headers });
        setUnreadCount(res.data.unreadCount); // dikkat: burada `.length` değil `.count`
        console.log(res.data);
      } catch (err) {
        console.error("Unread fetch error:", err);
      }
    };

    if (token) fetchUnreadReports();
  }, [token]);

  return (
    <aside
      className={`
        fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 
        bg-gray-800 text-white p-5 z-40 
        transform transition-transform duration-300 ease-in-out
        rounded-tr-2xl rounded-br-2xl
        ${isOpen ? "mt-4" : "mt-20"} 
        md:mt-20
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-auto 
      `}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/admin"
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          📊 Dashboard
        </Link>
        <Link
          to="/admin/users"
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          👥 Users
        </Link>
        <Link
          to="/admin/reports"
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition flex justify-between items-center"
        >
          <span>📄 Reports</span>
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-600 text-xs font-semibold text-white px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
