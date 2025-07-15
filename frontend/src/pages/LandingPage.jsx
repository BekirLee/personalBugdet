// pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useTypewriter } from "react-simple-typewriter";
import Slider from "react-slick";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import ChatForm from "../components/ChatForm";
import UserReviewsCarousel from "../components/UserReviewsCarousel";
import { BarChart2, ShieldCheck, Smartphone } from "lucide-react";

const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ income: 0, expense: 0 });
  const [chartData, setChartData] = useState([]);
  const [text] = useTypewriter({
    words: ["Plan your future", "Track every coin", "Succeed financially"],
    loop: true,
    delaySpeed: 2000,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/public-users")
      .then((res) => {
        setUsers(res.data);

        const totalIncome = res.data.reduce(
          (acc, user) => acc + (user.incomeTotal || 0),
          0
        );
        const totalExpense = res.data.reduce(
          (acc, user) => acc + (user.expenseTotal || 0),
          0
        );

        setChartData(
          res.data.map((user) => ({
            name: user.username,
            income: user.incomeTotal || 0,
            expense: user.expenseTotal || 0,
          }))
        );

        setStats({ income: totalIncome, expense: totalExpense });
      })
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 text-zinc-800">
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#0d47a1] text-white shadow-md gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">
          <BarChart2 size={22} className="text-[#fff]" />
          Personal Budget Planner
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-[#0d47a1] font-semibold rounded hover:bg-gray-200 transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-400 text-[#0d47a1] font-semibold rounded hover:bg-yellow-500 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-16"
        style={{ height: "100vh" }}
      >
        <p className="text-[85px] md:text-5xl font-bold mb-4 h-[90px]">
          {text}
        </p>
        <p className="max-w-xl mx-auto text-lg mb-6">
          Take full control of your budget and unlock financial freedom. Join
          the community of smart planners.
        </p>
        <a
          className="px-6 py-3 bg-[#0d47a1] text-white font-semibold rounded shadow hover:bg-blue-900"
          href="/register"
        >
          Get Started Free
        </a>
      </section>

      {/* Stats */}
      <section className="px-6 py-10 bg-white h-[50vh] mt-[150px]">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Platform Statistics
        </h3>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-blue-100 p-6 rounded shadow">
            <h4 className="text-xl font-bold text-[#0d47a1]">
              <CountUp end={users.length} duration={2} />+
            </h4>
            <p className="text-gray-700">Active Users</p>
          </div>
          <div className="bg-blue-100 p-6 rounded shadow">
            <h4 className="text-xl font-bold text-green-600">
              <CountUp end={stats.income} duration={2} prefix="$" />
            </h4>
            <p className="text-gray-700">Total Income Tracked</p>
          </div>
          <div className="bg-blue-100 p-6 rounded shadow">
            <h4 className="text-xl font-bold text-red-500">
              <CountUp end={stats.expense} duration={2} prefix="$" />
            </h4>
            <p className="text-gray-700">Total Expenses Logged</p>
          </div>
          <div className="bg-blue-100 p-6 rounded shadow">
            <h4 className="text-xl font-bold text-blue-500">
              <CountUp end={4.9} duration={2} decimals={1} suffix="/5" />
            </h4>
            <p className="text-gray-700">User Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="px-6 py-12 bg-white">
        <h3 className="text-2xl font-semibold text-center mb-6">
          User Activity Overview
        </h3>
        <div className="h-[300px] w-full min-w-[300px]">
          {chartData.length === 0 ? (
            <div className="text-center text-gray-500">
              Loading chart data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ccc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#16a34a"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#dc2626"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gradient-to-b from-blue-100 to-blue-50">
        <h3 className="text-3xl font-bold text-center mb-12 text-[#0d47a1]">
          Why Choose Us?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <BarChart2 className="mx-auto mb-2 text-[#0d47a1]" size={32} />
            <h4 className="text-xl font-semibold mb-2">Real-Time Insights</h4>
            <p className="text-gray-700">
              Instantly view your financial health with up-to-date dashboards
              and charts.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <ShieldCheck className="mx-auto mb-2 text-[#0d47a1]" size={32} />
            <h4 className="text-xl font-semibold mb-2"> Secure & Private</h4>
            <p className="text-gray-700">
              Your data is encrypted and protected with industry standards.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <Smartphone className="mx-auto mb-2 text-[#0d47a1]" size={32} />
            <h4 className="text-xl font-semibold mb-2">Cross-Platform</h4>
            <p className="text-gray-700">
              Access from desktop, tablet or mobile without losing performance.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <UserReviewsCarousel />

      {/* App Preview */}
      <section className="px-6 py-16 bg-gradient-to-b from-blue-50 to-blue-100">
        <h3 className="text-3xl font-bold text-center mb-10 text-[#0d47a1]">
          See It In Action
        </h3>
        <div className="flex justify-center">
          <img
            src="\src\assets\images\mobileVers.png"
            alt="App preview"
            className="rounded-lg shadow-lg w-[300px] h-[600px] object-cover"
          />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-4 text-[#0d47a1]">
          Stay in the Loop
        </h3>
        <p className="text-gray-700 mb-6">
          Get updates, tips, and exclusive features delivered to your inbox.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#0d47a1] text-white rounded hover:bg-blue-900"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Chatform */}
      <ChatForm />

      {/* Social Media Links in Footer */}
      <footer className="text-center py-6 text-sm text-gray-600 bg-blue-100 mt-8">
        &copy; {new Date().getFullYear()} Personal Budget Planner. All rights
        reserved.
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="text-[#0d47a1] hover:text-blue-800">
            Twitter
          </a>
          <a href="#" className="text-[#0d47a1] hover:text-blue-800">
            LinkedIn
          </a>
          <a href="#" className="text-[#0d47a1] hover:text-blue-800">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
