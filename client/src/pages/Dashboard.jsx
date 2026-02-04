import AddTodo from "../components/AddTodo";
import Sidebar from "../components/Sidebar";

import TodoList from "../components/TodoList";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
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
