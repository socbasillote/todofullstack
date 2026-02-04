import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFolder } from "../redux/folder/folderSlice";
import CreateFolderModal from "./CreateFolderModal";

function FolderSidebar() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { folders, activeFolder } = useSelector((state) => state.folder);
  return (
    <div className="w-64 border-r p-4">
      <h3 className="font-semibold mb-2">Folders</h3>
      {/* Inbox / All */}
      <button
        onClick={() => dispatch(setActiveFolder(null))}
        className={`block w-full text-left px-2 py-1 rounded mb-1
          ${activeFolder === null ? "" : "hover:bg-slate-800 hover:text-white"}`}
      >
        📥 All Todos
      </button>

      {folders.map((f) => (
        <button
          key={f._id}
          onClick={() => dispatch(setActiveFolder(f._id))}
          className={`block w-full text-left px-2 py-1 rounded
            ${activeFolder === f._id ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          📁 {f.name}
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className="mt-3 text-blue-500 text-sm"
      >
        + Add Folder
      </button>

      {showModal && <CreateFolderModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default FolderSidebar;
