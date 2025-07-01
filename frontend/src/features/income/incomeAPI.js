import axiosInstance from '../../services/axiosInstance';

export const getIncomesAPI = async () => {
  try {
    const res = await axiosInstance.get('/income');
    console.log('👉 API dönen veri:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ API hatası:', err.response?.data || err.message);
    throw err;
  }
};

export const addIncomeAPI = async (incomeData) => {
  const res = await axiosInstance.post('/income', incomeData);
  return res.data;
};

export const deleteIncomeAPI = async (id) => {
  await axiosInstance.delete(`/income/${id}`);
};
