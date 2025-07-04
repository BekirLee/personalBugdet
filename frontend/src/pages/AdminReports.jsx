import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/Sidebar";
import { FileText } from "lucide-react";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Raporları çek
        const res = await axios.get("/api/reports", { headers });
        setReports(res.data);

        // 2. Raporları 'okundu' olarak işaretle
        await axios.put("/api/reports/mark-all-read", {}, { headers });
      } catch (err) {
        console.error("Reports fetch or mark read error:", err);
      }
    };
    if (token) fetchReports();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col scrollbar-hide">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="min-h-screen flex">
        <AdminSidebar isOpen={isSidebarOpen} />

        <main
          className={`flex-1 transition-all duration-300 p-6 overflow-y-auto no-scrollbar pt-20 ${
            isSidebarOpen ? "md:ml-4" : "md:ml-0"
          }`}
          style={{ height: "calc(100vh - 56px)" }}
        >
          <div className="flex items-center ">
            <FileText className="text-white mb-6" size={38} />
            <h1 className="text-2xl font-bold mb-6">Reports</h1>
          </div>

          <div className="space-y-4">
            {reports.map((r) => (
              <div key={r._id} className="bg-white p-4 rounded shadow">
                <p className="text-gray-800">{r.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Sent by: {r.user?.username || "Ziyaretçi"} |{" "}
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
