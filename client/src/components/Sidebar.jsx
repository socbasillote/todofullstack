import React from "react";
import { LogOut, ListTodo, Folder } from "lucide-react";
import FolderSidebar from "./FolderSidebar";

function Sidebar() {
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

        <FolderSidebar />
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
