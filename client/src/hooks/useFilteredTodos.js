import { useMemo } from "react";
import { getTimeRemaining } from "../utils/getTimeRemaining";

export function useFilteredTodos(todos, filter, activeFolder) {
  return useMemo(() => {
    if (filter === "finished") return [];

    return todos.filter((t) => {
      if (activeFolder && t.folder?._id !== activeFolder) return false;

      const time = t.expiresAt ? getTimeRemaining(t.expiresAt) : null;

      switch (filter) {
        case "ongoing":
          return !t.completed && !time?.expired;
        case "active":
          return t.expiresAt && !time?.expired && !t.completed;
        case "expired":
          return t.expiresAt && time?.expired;
        default:
          return true;
      }
    });
  }, [todos, filter, activeFolder]);
}
