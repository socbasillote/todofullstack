import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddTodo from "../components/Todo/AddTodo";

import TodoList from "../components/Todo/TodoList";

function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar (static) */}
      <div className="">
        <Sidebar />
      </div>

      {/* Main Content (scrolls) */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto p-4 space-y-6">
          {/* TODO LIST */}
          <TodoList />

          {/* ADD TODO SECTION */}
          <div className="border-t pt-4">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-3 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50"
              >
                ➕ Add Todo
              </button>
            ) : (
              <div className="space-y-2">
                <AddTodo onClose={() => setShowAddForm(false)} />
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
