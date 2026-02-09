import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTodo,
  getTodos,
  setFilter,
  toggleTodo,
  updateTodo,
} from "../../redux/todoSlice";
import { fetchFolders } from "../../redux/folder/folderThunks";

import { useFilteredTodos } from "../../hooks/useFilteredTodos";
import FinishedTodos from "./FinishedTodos";
import TodoItem from "./TodoItem";

function TodoList() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state) => state.todo);
  const { folders, activeFolder } = useSelector((state) => state.folder);

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    folder: "",
    hasExpiration: false,
    expiresIn: null,
  });

  const [, forceTick] = useState(0);

  useEffect(() => {
    dispatch(fetchFolders());
    dispatch(getTodos());
  }, [dispatch]);

  useEffect(() => {
    const i = setInterval(() => forceTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const filteredTodos = useFilteredTodos(todos, filter, activeFolder);
  const finishedTodos =
    filter === "finished" ? todos.filter((t) => t.completed) : [];

  const handleEdit = (todo) => {
    setEditingTodoId(todo._id);
    setEditForm({
      title: todo.title,
      description: todo.description,
      folder: todo.folder?._id || "",
      hasExpiration: Boolean(todo.expiresAt),
      expiresIn: todo.expiresAt
        ? Math.ceil((new Date(todo.expiresAt) - Date.now()) / 60000)
        : 60,
    });
  };

  const handleSave = (id) => {
    dispatch(
      updateTodo({
        id,
        form: {
          title: editForm.title,
          description: editForm.description,
          folder: editForm.folder || null,
          expiresIn: editForm.hasExpiration ? editForm.expiresIn : null,
        },
      }),
    );
    setEditingTodoId(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-4">
        <button onClick={() => dispatch(setFilter("ongoing"))}>
          🟢 Ongoing
        </button>
        <button onClick={() => dispatch(setFilter("finished"))}>
          ✅ Finished
        </button>
        <button onClick={() => dispatch(setFilter("active"))}>⏳ Active</button>
        <button onClick={() => dispatch(setFilter("expired"))}>
          ⛔ Expired
        </button>
      </div>

      {filter === "finished" ? (
        <FinishedTodos todos={finishedTodos} />
      ) : (
        <ul className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              folders={folders}
              editingTodoId={editingTodoId}
              editForm={editForm}
              setEditForm={setEditForm}
              onToggle={(id) => dispatch(toggleTodo(id))}
              onEdit={handleEdit}
              onSave={handleSave}
              onDelete={(id) => dispatch(deleteTodo(id))}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
