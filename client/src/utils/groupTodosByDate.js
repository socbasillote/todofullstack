export function groupTodosByDate(todos) {
  return todos.reduce((groups, todo) => {
    if (!todo.completedAt) return groups;

    const dateKey = new Date(todo.completedAt).toDateString();
    console.log(dateKey);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(todo);
    return groups;
  }, {});
}
