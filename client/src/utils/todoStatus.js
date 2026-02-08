export function getTodosStatus(todo) {
  if (todo.completed) return "completed";

  if (todo.expiresAt) {
    const now = new Date();
    const due = new Date(todo.expiresAt);

    // normalize to date-only
    now.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < now) return "overdue";
    if (due.getTime() === now.getTime()) return "today";
  }

  return "normal";
}
