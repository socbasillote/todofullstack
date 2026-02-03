import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import todoSlice from "./todoSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: todoSlice,
  },
});
