import { createAsyncThunk } from "@reduxjs/toolkit";

// base api
const BASE_URL = "http://localhost:5000/api/folders";

/**
 * Fetch all folders
 */
export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch folders");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/**
 * Create new folder
 */
export const createFolder = createAsyncThunk(
  "folders/createFolder",
  async (folderName, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName }),
      });

      if (!res.ok) throw new Error("Failed to create folder");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/**
 * Delete folder
 */
export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (folderId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${folderId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete folder");
      return folderId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
