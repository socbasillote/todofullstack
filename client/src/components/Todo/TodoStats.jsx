import React from "react";
import { getDailyStats } from "../../utils/todo/getDailyStats";
import { getWeeklyStats } from "../../utils/todo/getWeeklyStats";

function TodoStats({ todos }) {
  const daily = getDailyStats(todos);
  const weekly = getWeeklyStats(todos);

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded shadow">
      {/* Daily */}
      <div className="mb-2">
        <strong>📊 Today:</strong> ✔ {daily.completed} ⏳ {daily.active} ⛔{" "}
        {daily.expired}
      </div>

      {/* Weekly */}
      <div>
        <strong>📅 This Week:</strong> ✔ {weekly.completed} ⛔ {weekly.expired}{" "}
        | Completion Rate: {weekly.completionRate}%
      </div>
    </div>
  );
}

export default TodoStats;
