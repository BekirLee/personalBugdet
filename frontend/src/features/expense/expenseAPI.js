import axiosInstance from "../../services/axiosInstance";

export const getExpensesAPI = async () => {
  const res = await axiosInstance.get("/expense");
  console.log("hello", res.data);
  return res.data;
};

export const addExpenseAPI = async (expenseData) => {
  const res = await axiosInstance.post("/expense", expenseData);
  return res.data;
};

export const deleteExpenseAPI = async (id) => {
  await axiosInstance.delete(`/expense/${id}`);
};
