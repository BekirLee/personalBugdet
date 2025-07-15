import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
// import Particles from "react-tsparticles";
import ParticlesComponent from "../components/ParticlesComponent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [token, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };
  // /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  // particlesJS.load("particles-js", "../compoparticles.json", function () {
  //   console.log("callback - particles.js config loaded");
  // });

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#0f172a",
      }}
    >
      <ParticlesComponent />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: "40px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          Log in
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Loging in..." : "Log in"}
          </button>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Login;
