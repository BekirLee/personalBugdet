import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// User pages
import Dashboard from "./pages/Dashboard";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminMessages from "./pages/AdminReports";
import AdminReports from "./pages/AdminReports";

function App() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const isAdmin = token && role === "admin";
  const isUser = token && role === "user";

  return (
    <BrowserRouter>
      <Routes>
        {/* Home route: redirect based on auth */}
        <Route
          path="/"
          element={
            token ? (
              isAdmin ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <LandingPage />
            )
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User route (protected) */}
        <Route
          path="/dashboard"
          element={isUser ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Admin routes (all protected) */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/reports"
          element={
            token && role === "admin" ? (
              <AdminReports />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/users"
          element={isAdmin ? <AdminUsers /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/reports"
          element={isAdmin ? <AdminMessages /> : <Navigate to="/login" />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
