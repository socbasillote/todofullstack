import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFolder } from "../../redux/folder/folderThunks";

function CreateFolderModal({ onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;

    dispatch(createFolder(name));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-black">Create Folder</h3>

        <input
          type="text"
          placeholder="Folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4 text-gray-800"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFolderModal;
