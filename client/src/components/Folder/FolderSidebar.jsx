import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFolder } from "../../redux/folder/folderSlice";
import CreateFolderModal from "./CreateFolderModal";
import { deleteFolder, fetchFolders } from "../../redux/folder/folderThunks";
import { Ellipsis } from "lucide-react";
import { getTodos } from "../../redux/todoSlice";

function FolderSidebar() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { folders, activeFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    dispatch(fetchFolders());
    dispatch(getTodos());
  }, [dispatch]);

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
        <div
          key={f._id}
          className={`group flex items-center justify-between rounded px-2 py-1
      ${activeFolder === f._id ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          {/* Folder button */}
          <button
            onClick={() => dispatch(setActiveFolder(f._id))}
            className="flex items-center gap-2 w-full text-left text-black"
          >
            <span>📁</span>
            <span className="truncate">{f.name}</span>
          </button>

          {/* Actions */}
          <div className="relative flex items-center">
            {/* Ellipsis */}
            <button
              className="opacity-100 group-hover:opacity-0 transition-opacity text-gray-500 hover:text-gray-800"
              aria-label="More options"
            >
              <Ellipsis />
            </button>

            {/* Delete (appears on hover) */}
            <button
              onClick={() => dispatch(deleteFolder(f._id))}
              className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity
                   text-red-500 hover:text-red-700"
              aria-label="Delete folder"
            >
              🗑
            </button>
          </div>
        </div>
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
