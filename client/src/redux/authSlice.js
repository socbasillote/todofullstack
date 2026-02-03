import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/auth";

export const register = createAsyncThunk(
  "auth/register",
  async ({ form, navigate }, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message);
    }
    const data = await response.json();
    console.log("REGISTER RESPONSE 👉", data);
    navigate("/");
    return data;
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ form, navigate }, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message);
    }

    const data = await response.json();
    console.log(data.token || data.accessToken || data.jwt);
    navigate("/");
    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("token") },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
