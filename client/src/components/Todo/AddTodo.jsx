import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, getFolders, getTodos } from "../../redux/todoSlice";

function AddTodo() {
  const dispatch = useDispatch();
  const { folders } = useSelector((state) => state.folder); // ✅ fetch from folder slice

  const [form, setForm] = useState({
    title: "",
    description: "",
    hasExpiration: false,
    folder: "", // selected folder ID
    expiresIn: 60, // default: 60 minutes
  });

  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) return;

    // Build payload for backend
    const payload = {
      title: form.title,
      description: form.description,
      folder: form.folder || null, // assign folder or null
      expiresIn: form.hasExpiration ? form.expiresIn : null, // minutes or null
    };

    dispatch(createTodo(payload));

    // Reset form
    setForm({
      title: "",
      description: "",
      hasExpiration: false,
      folder: "",
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
        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Optional Expiration */}
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

        {/* Folder Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Assign to Folder</label>
          <select
            value={form.folder}
            onChange={(e) => setForm({ ...form, folder: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No Folder</option>
            {folders.map((f) => (
              <option key={f._id} value={f._id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
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
