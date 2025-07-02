import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIncomesAPI, addIncomeAPI, deleteIncomeAPI } from "./incomeAPI";
import axiosInstance from "../../services/axiosInstance";

const initialState = {
  incomes: [],
  loading: false,
  error: null,
};

// export const fetchIncomes = createAsyncThunk('income/fetchIncomes', async (_, thunkAPI) => {
//   try {
//     return await getIncomesAPI();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

export const fetchIncomes = createAsyncThunk(
  "income/fetchIncomes",
  async (dateRange, thunkAPI) => {
    const params = dateRange
      ? `?start=${dateRange.start}&end=${dateRange.end}`
      : "";
    const res = await axiosInstance.get(`/income${params}`);
    return res.data;
  }
);

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (incomeData, thunkAPI) => {
    try {
      return await addIncomeAPI(incomeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (id, thunkAPI) => {
    try {
      await deleteIncomeAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default incomeSlice.reducer;
