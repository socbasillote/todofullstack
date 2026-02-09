export const getDailyStats = (todos) => {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  let completed = 0;
  let active = 0;
  let expired = 0;

  todos.forEach((t) => {
    const completedAt = t.completedAt ? new Date(t.completedAt) : null;
    const now = new Date();
    const expiredCheck = t.expiresAt ? new Date(t.expiresAt) : null;

    if (completedAt && completedAt >= startOfDay) completed += 1;
    else if (!t.completed && expiredCheck && expiredCheck < now) expired += 1;
    else if (!t.completed) active += 1;
  });

  return { completed, active, expired };
};
