// import axiosInstance from '../../services/axiosInstance';

// export const registerUserAPI = async (userData) => {
//   const response = await axiosInstance.post('/auth/register', userData);
//   return response.data;
// };

// export const loginUserAPI = async (userData) => {
//   const response = await axiosInstance.post('/auth/login', userData);
//   return response.data;
// };

// src/features/auth/authAPI.js
import axiosInstance from '../../services/axiosInstance';

export const registerUserAPI = async (userData) => {
  const res = await axiosInstance.post('/auth/register', userData);
  return res.data;
};

export const loginUserAPI = async (userData) => {
  const res = await axiosInstance.post('/auth/login', userData);
  return res.data;
};
