export const getWeeklyStats = (todos) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

  let completed = 0;
  let expired = 0;

  todos.forEach((t) => {
    const completedAt = t.completedAt ? new Date(t.completedAt) : null;
    const now = new Date();
    const expiredCheck = t.expiresAt ? new Date(t.expiresAt) : null;

    if (completedAt && completedAt >= startOfWeek) completed += 1;
    if (
      !t.completed &&
      expiredCheck &&
      expiredCheck < now &&
      expiredCheck >= startOfWeek
    )
      expired += 1;
  });

  const total = completed + expired;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  return { completed, expired, completionRate };
};
