import { createSlice } from "@reduxjs/toolkit";
import { createFolder, deleteFolder, fetchFolders } from "./folderThunks";

const initialState = {
  folders: [],
  activeFolder: null,
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setActiveFolder: (state, action) => {
      state.activeFolder = action.payload;
    },
    clearActiveFolder: (state) => {
      state.activeFolder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.loading = false;
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload);
      })

      // DELETE
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter(
          (folder) => folder._id !== action.payload,
        );
      });
  },
});

export const { setActiveFolder, clearActiveFolder } = folderSlice.actions;
export default folderSlice.reducer;
