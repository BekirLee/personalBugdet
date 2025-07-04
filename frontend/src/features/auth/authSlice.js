import { registerUserAPI, loginUserAPI } from "./authAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as jwt_decode from "jwt-decode";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
// import jwt_decode from "jwt-decode/build/jwt-decode.esm.js"; // ✅ Vite uyumlu çözüm

const initialState = {
  token: null,
  loading: false,
  role: null,
  error: null,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const data = await registerUserAPI(userData);
      return data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const data = await loginUserAPI(userData);
      const decoded = jwtDecode(data.token);

      return { token: data.token, role: decoded.user.role };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const res = await axios.get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

// export const fetchUsers = createAsyncThunk(
//   "auth/fetchUsers",
//   async (_, thunkAPI) => {
//     try {
//       // const token = thunkAPI.getState().auth.token;

//       const res = await axios.get("http://localhost:5000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;

        const decoded = jwtDecode(action.payload);
        state.role = decoded.user.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
