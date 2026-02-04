import React from "react";
import { LogOut, ListTodo, Folder } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.todo.folders);

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-slate-100">
      {/* Top / Logo */}
      <div className="border-b border-slate-800 px-6 py-5">
        <h1 className="text-2xl font-bold tracking-tight">
          Todo<span className="text-blue-500">App</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
          <ListTodo size={18} />
          Todo
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
          <Folder size={18} />
          Folder
        </button>
        <div className="w-64 border-r p-4">
          <h3 className="font-semibold mb-2">Folders</h3>

          {folders.map((f) => (
            <button
              key={f._id}
              onClick={() => dispatch(setActiveFolder(f._id))}
              className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
            >
              📁 {f.name}
            </button>
          ))}

          <button className="mt-2 text-blue-500">+ Add Folder</button>
        </div>
      </nav>

      {/* Bottom / Logout */}
      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-500/10 hover:text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
