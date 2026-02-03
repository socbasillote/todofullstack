import AddTodo from "../components/AddTodo";

import UserTodoList from "../components/UserTodoList";

function UserDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <AddTodo />

      <UserTodoList />
    </div>
  );
}

export default UserDashboard;
