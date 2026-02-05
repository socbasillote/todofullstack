import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/todo";

// Creat todo lsit
export const createTodo = createAsyncThunk(
  "todo/create",
  async (form, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message);
    }

    const data = await response.json();

    return data;
  },
);

// Get user todo
export const getUserTodo = createAsyncThunk(
  "todo/getUserTodos",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
  },
);

// toggle todo check
export const toggleTodo = createAsyncThunk(
  "todo/toggle",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`${BASE_URL}/${id}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err.message);
    }

    return await res.json();
  },
);

export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
  },
);

export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ id, form }, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message);
    }

    return data;
  },
);

export const deleteTodo = createAsyncThunk("todo/delete", async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return id;
});

export const getFolders = createAsyncThunk(
  "folder/getFolders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/folders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message);
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Assing folder for todo
export const assignTodoToFolder = createAsyncThunk(
  "todo/assignToFolder",
  async ({ todoId, folderId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${todoId}/assign-folder`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ folderId }),
      });

      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  todos: [],
  folders: [],
  activeFolder: null,
  filter: "ongoing",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setActiveFolder: (state, action) => {
      state.activeFolder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        console.log("added");
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })

      .addCase(getUserTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state) => {
        state.todos = [];
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo,
        );
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t._id !== action.payload);
      })

      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((t) =>
          t._id === action.payload._id ? action.payload : t,
        );
      })

      .addCase(assignTodoToFolder.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (t) => t._id === action.payload._id,
        );

        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })

      .addCase(getFolders.fulfilled, (state, action) => {
        state.folders = action.payload;
      });
  },
});

export const { setFilter, setActiveFolder } = todoSlice.actions;

export default todoSlice.reducer;
