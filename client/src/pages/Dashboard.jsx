import Sidebar from "../components/Sidebar";
import AddTodo from "../components/Todo/AddTodo";

import TodoList from "../components/Todo/TodoList";

function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar (static) */}
      <div className="">
        <Sidebar />
      </div>

      {/* Main Content (scrolls) */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold text-slate-800">Dashboard</h1>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <AddTodo />
          </div>

          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <TodoList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
