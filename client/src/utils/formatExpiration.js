export function formatExpiration(date) {
  const d = new Date(date);

  return {
    time: d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    date: d.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    full: d.toLocaleString(),
  };
}
