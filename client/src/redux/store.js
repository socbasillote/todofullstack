import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import todoSlice from "./todoSlice.js";
import folderSlice from "./folder/folderSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: todoSlice,
    folder: folderSlice,
  },
});
