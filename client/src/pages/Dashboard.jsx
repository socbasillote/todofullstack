import AddTodo from "../components/AddTodo";

import TodoList from "../components/TodoList";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <AddTodo />

      <TodoList />
    </div>
  );
}

export default Dashboard;
