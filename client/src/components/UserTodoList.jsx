import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getUserTodo, updateTodo } from "../redux/todoSlice";

function UserTodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  useEffect(() => {
    dispatch(getUserTodo());
  }, [dispatch]);

  // Start editing a todo
  const handleEditClick = (todo) => {
    setEditingTodoId(todo._id);
    setEditForm({ title: todo.title, description: todo.description });
  };

  // Save the edited todo
  const handleSaveClick = (id) => {
    dispatch(updateTodo({ id, form: editForm }));
    setEditingTodoId(null);
    setEditForm({ title: "", description: "" });
  };

  return (
    <div>
      <ul className="space-y-4">
        {todos.map((t) => (
          <li
            key={t._id}
            className="flex justify-between items-start p-4 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
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
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{t.description}</p>
                </>
              )}
            </div>

            <div className="ml-4 flex space-x-2">
              {editingTodoId === t._id ? (
                <button
                  onClick={() => handleSaveClick(t._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(t)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => dispatch(deleteTodo(t._id))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTodoList;
