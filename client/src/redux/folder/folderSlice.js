import { createSlice } from "@reduxjs/toolkit";
import { createFolder, deleteFolder, fetchFolders } from "./folderThunks";

const initialState = {
  folders: [],
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
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

export default folderSlice.reducer;
