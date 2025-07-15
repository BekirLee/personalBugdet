import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BarChart2 } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => navigate("/"), 50); // 50ms bekleterek yönlendir
  };

  const token = useSelector((state) => state.auth.token); // token alındı

  // const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` }, // token eklendi
        });
        setUsers(res.data);
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    if (token) fetchUser();
  }, [token]);

  console.log(users);

  return (
    <nav className="bg-white shadow flex items-center justify-between fixed w-full px-6 py-3 mb-6 rounded-md z-[10]">
      <span className="text-xl font-semibold text-gray-700">
        <BarChart2 size={22} className="text-[#0d47a1]" />
        Budget Planner
      </span>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar} // <- burası mutlaka olmalı
          className="md:hidden p-2 rounded hover:bg-indigo-700 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        {users && users.profileImage ? (
          <img
            src={`http://localhost:5000/uploads/${users.profileImage}`}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">U</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
