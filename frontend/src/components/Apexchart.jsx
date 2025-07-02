import React from "react";
import ReactApexChart from "react-apexcharts";

const BudgetAreaChart = ({ incomes, expenses }) => {
  // Tarihe göre toplamları gruplama fonksiyonu
  function groupByDateSum(items) {
    return items.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date] += Number(item.amount);
      return acc;
    }, {});
  }

  const incomeByDate = groupByDateSum(incomes);
  const expenseByDate = groupByDateSum(expenses);

  const allDates = Array.from(new Set([
    ...Object.keys(incomeByDate),
    ...Object.keys(expenseByDate),
  ])).sort((a, b) => new Date(a) - new Date(b));

  const incomeSeries = allDates.map(date => incomeByDate[date] || 0);
  const expenseSeries = allDates.map(date => expenseByDate[date] || 0);

  const series = [
    { name: "Income", data: incomeSeries },
    { name: "Expense", data: expenseSeries },
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: ["#10b981", "#ef4444"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6, colors: "#000" },
    },
    xaxis: {
      categories: allDates,
      labels: {
        rotate: -45,
        style: { colors: "#f9fafb" },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val}`,
        style: {
          colors: "#cbd5e1",
          fontSize: "14px",
        },
      },
    },
    colors: ["#10b981", "#ef4444"],
    tooltip: {
      y: { formatter: (val) => `$${val}` },
      theme: "dark",
    },
    legend: {
      labels: { colors: "#f9fafb" },
    },
    grid: {
      borderColor: "#374151",
    },
  };

  return (
    <div className="bg-[#1f2937] p-4 rounded-lg shadow-lg">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default BudgetAreaChart;
