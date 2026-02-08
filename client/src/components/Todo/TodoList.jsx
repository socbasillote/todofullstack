import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  setFilter,
  toggleTodo,
  updateTodo,
} from "../../redux/todoSlice";
import { getTimeRemaining } from "../../utils/getTimeRemaining";
import { fetchFolders } from "../../redux/folder/folderThunks";
import { getTodosStatus } from "../../utils/todoStatus";
import { TODO_STATUS } from "../../constants/todoStatusConfig";

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
    expiresIn: 60,
  });

  const [, forceTick] = useState(0); // for countdown updates

  // countdown tick every second
  useEffect(() => {
    const interval = setInterval(() => forceTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(fetchFolders());
    dispatch(getTodos());
  }, [dispatch]);

  const handleEditClick = (todo) => {
    setEditingTodoId(todo._id);
    setEditForm({
      title: todo.title,
      description: todo.description,
      folder: todo.folder?._id || null,
      hasExpiration: !!todo.expiresAt,
      expiresIn: todo.expiresAt
        ? Math.ceil((new Date(todo.expiresAt) - Date.now()) / 60000)
        : 60,
    });
  };

  const handleSaveClick = (id) => {
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

  // Filter todos by folder + status
  const SOON_THRESHOLD_MINUTES = 10;
  const filteredTodos = todos.filter((t) => {
    // Folder filter
    if (activeFolder && t.folder?._id !== activeFolder) return false;

    const time = t.expiresAt ? getTimeRemaining(t.expiresAt) : null;

    switch (filter) {
      case "ongoing":
        return !t.completed && !time?.expired;
      case "finished":
        return t.completed;
      case "active":
        return t.expiresAt && !time?.expired && !t.completed;
      case "expired":
        return t.expiresAt && time?.expired;
      default:
        return true;
    }
  });

  return (
    <div className="flex flex-col">
      {/* FILTER BUTTONS */}
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

      {/* TODOS */}
      <ul className="space-y-4">
        {filteredTodos.map((t) => {
          const time = t.expiresAt ? getTimeRemaining(t.expiresAt) : null;
          const isExpired = t.expiresAt && time?.expired;

          const status = getTodosStatus(t);
          const ui = TODO_STATUS[status];

          return (
            <li
              key={t._id}
              className="group flex justify-between items-start p-4 bg-white shadow rounded-lg"
            >
              <div className="flex-1 flex items-start gap-2">
                {/* Completed checkbox */}
                <button
                  onClick={() => dispatch(toggleTodo(t._id))}
                  className={`w-6 h-6 rounded border flex items-center justify-center
                    ${t.completed ? "bg-green-500 text-white" : "bg-white"}`}
                >
                  {t.completed && "✓"}
                </button>

                {/* Edit mode */}
                {editingTodoId === t._id ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full border rounded px-2 py-1"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full border rounded px-2 py-1"
                    />
                    <select
                      value={editForm.folder}
                      onChange={(e) =>
                        setEditForm({ ...editForm, folder: e.target.value })
                      }
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="">Select Folder</option>
                      {folders.map((f) => (
                        <option key={f._id} value={f._id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex-1">
                    <span
                      className={`w-3 h-3 rounded-full ${ui.dot}`}
                      title={ui.label}
                    />
                    <h3
                      className={`text-lg font-semibold ${t.completed ? "line-through" : ""}`}
                    >
                      {t.title}
                    </h3>
                    {ui.label && (
                      <span className="text-xs text-gray-400">{ui.label}</span>
                    )}
                    <p className="text-gray-600">{t.description}</p>
                    <p className="text-sm text-gray-500">
                      Folder: {t.folder?.name || "None"}
                    </p>

                    {!t.expiresAt && (
                      <span className="text-gray-400">No expiration</span>
                    )}

                    {t.expiresAt && (
                      <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded
                          ${time.expired ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {time.expired
                          ? "⛔ Expired"
                          : `⏳ ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div
                className={`
                  ml-4 flex gap-2 transition-opacity duration-200
                  ${editingTodoId === t._id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                `}
              >
                {editingTodoId === t._id ? (
                  <button
                    onClick={() => handleSaveClick(t._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    disabled={isExpired}
                    onClick={() => handleEditClick(t)}
                    className={`px-3 py-1 rounded ${isExpired ? "bg-gray-300" : "bg-blue-500 text-white"}`}
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => dispatch(deleteTodo(t._id))}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
