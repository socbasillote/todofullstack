import { groupTodosByDate } from "../../utils/groupTodosByDate";
import { getDateLabel } from "../../utils/getDateLabel";
import { formatTime24 } from "../../utils/formatTime24";

function FinishedTodos({ todos }) {
  const grouped = groupTodosByDate(todos);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <h4 className="text-sm font-semibold text-gray-500 mb-2">
            {getDateLabel(date)}
          </h4>

          <ul className="space-y-2">
            {items.map((t) => (
              <li
                key={t._id}
                className="p-3 bg-gray-50 rounded flex justify-between"
              >
                <span className="line-through text-gray-600">{t.title}</span>
                <span className="text-xs text-gray-400">
                  {formatTime24(t.completedAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default FinishedTodos;
