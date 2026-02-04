import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../redux/todoSlice";

function AddTodo() {
  const { folders } = useSelector((state) => state.todo);
  const [form, setForm] = useState({
    title: "",
    description: "",
    hasExpiration: false,
    folder: "",
    expiresIn: 60, // default: 60 minutes
  });

  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!form.title.trim() && !form.description.trim()) return;

    const payload = {
      title: form.title,
      description: form.description,
      expiresIn: form.hasExpiration ? form.expiresIn : null,
    };
    dispatch(createTodo(payload));
    setForm({
      title: "",
      description: "",
      hasExpiration: false,
      expiresIn: 60,
    });
    console.log("Todo added successfully");
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add Todo
      </h2>
      <form onSubmit={handleAddTodo}>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.hasExpiration}
            onChange={(e) =>
              setForm({ ...form, hasExpiration: e.target.checked })
            }
          />
          <label className="text-gray-700">Set expiration</label>
        </div>

        <select
          value={form.folder}
          onChange={(e) => setForm({ ...form, folder: e.target.value })}
        >
          <option value="">Select Folder</option>
          {folders.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>

        {form.hasExpiration && (
          <div className="mb-4">
            <label className="block text-gray-700">Expire in (minutes)</label>
            <input
              type="number"
              min="0"
              value={form.expiresIn}
              onChange={(e) =>
                setForm({ ...form, expiresIn: Number(e.target.value) })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
