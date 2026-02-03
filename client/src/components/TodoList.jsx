import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  setFilter,
  updateTodo,
} from "../redux/todoSlice";
import { getTimeRemaining } from "../utils/getTimeRemaining";

function TodoList() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state) => state.todo);

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const [, forceTick] = useState(0);

  // countdown tick
  useEffect(() => {
    const interval = setInterval(() => {
      forceTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleEditClick = (todo) => {
    setEditingTodoId(todo._id);
    setEditForm({ title: todo.title, description: todo.description });
  };

  const handleSaveClick = (id) => {
    dispatch(updateTodo({ id, form: editForm }));
    setEditingTodoId(null);
    setEditForm({ title: "", description: "" });
  };

  // 🔎 FILTER LOGIC
  const SOON_THRESHOLD_MINUTES = 10;

  const filteredTodos = todos.filter((t) => {
    if (!t.expiresAt) {
      return filter === "all";
    }

    const time = getTimeRemaining(t.expiresAt);

    if (filter === "expired") return time.expired;

    if (filter === "soon") {
      if (time.expired) return false;

      const totalMinutes = time.days * 1440 + time.hours * 60 + time.minutes;

      return totalMinutes <= SOON_THRESHOLD_MINUTES;
    }

    return true;
  });

  return (
    <div>
      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-emerald-600 text-white" : "bg-emerald-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => dispatch(setFilter("soon"))}
          className={`px-3 py-1 rounded ${
            filter === "soon" ? "bg-yellow-500 text-white" : "bg-yellow-200"
          }`}
        >
          ⏳ Expires Soon
        </button>

        <button
          onClick={() => dispatch(setFilter("expired"))}
          className={`px-3 py-1 rounded ${
            filter === "expired" ? "bg-red-500 text-white" : "bg-red-200"
          }`}
        >
          ⛔ Expired
        </button>
      </div>

      {/* TODOS */}
      <ul className="space-y-4">
        {filteredTodos.map((t) => {
          const time = t.expiresAt ? getTimeRemaining(t.expiresAt) : null;
          const isExpired = t.expiresAt && time?.expired;

          return (
            <li
              key={t._id}
              className="flex justify-between items-start p-4 bg-white shadow rounded-lg"
            >
              <div className="flex-1">
                {editingTodoId === t._id ? (
                  <div className="space-y-2">
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
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{t.title}</h3>
                    <p className="text-gray-600">{t.description}</p>

                    {!t.expiresAt && (
                      <span className="text-gray-400">No expiration</span>
                    )}

                    {t.expiresAt && (
                      <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded
                          ${
                            time.expired
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {time.expired
                          ? "⛔ Expired"
                          : `⏳ ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="ml-4 flex gap-2">
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
                    className={`px-3 py-1 rounded
                      ${
                        isExpired
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 text-white"
                      }`}
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
