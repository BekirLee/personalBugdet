import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";

const AdminRoute = () => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return <AdminLayout><Outlet /></AdminLayout>;
};

export default AdminRoute;
