import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExpensesAPI, addExpenseAPI, deleteExpenseAPI } from "./expenseAPI";
import axiosInstance from "../../services/axiosInstance";

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

// export const fetchExpenses = createAsyncThunk('expense/fetchExpenses', async (_, thunkAPI) => {
//   try {
//     console.log()
//     return await getExpensesAPI();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (dateRange, thunkAPI) => {
    const params = dateRange
      ? `?start=${dateRange.start}&end=${dateRange.end}`
      : "";
    const res = await axiosInstance.get(`/expense${params}`);
    return res.data;
  }
);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, thunkAPI) => {
    try {
      return await addExpenseAPI(expenseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id, thunkAPI) => {
    try {
      await deleteExpenseAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default expenseSlice.reducer;
