import { getTimeRemaining } from "../../utils/getTimeRemaining";
import { getTodosStatus } from "../../utils/todoStatus";
import { formatExpiration } from "../../utils/formatExpiration";
import { TODO_STATUS } from "../../constants/todoStatusConfig";

function TodoItem({
  todo,
  folders,
  editingTodoId,
  editForm,
  setEditForm,
  onToggle,
  onEdit,
  onSave,
  onDelete,
}) {
  const time = todo.expiresAt ? getTimeRemaining(todo.expiresAt) : null;
  const isExpired = todo.expiresAt && time?.expired;

  const status = getTodosStatus(todo);
  const ui = TODO_STATUS[status];

  const isEditing = editingTodoId === todo._id;

  return (
    <li className="group flex justify-between items-start p-4 bg-white shadow rounded-lg">
      <div className="flex-1 flex items-start gap-2">
        <button
          onClick={() => onToggle(todo._id)}
          className={`w-6 h-6 rounded border flex items-center justify-center
            ${todo.completed ? "bg-green-500 text-white" : "bg-white"}`}
        >
          {todo.completed && "✓"}
        </button>

        {isEditing ? (
          <div className="flex-1 space-y-2">
            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              className="w-full border rounded px-2 py-1"
            />
            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className="w-full border rounded px-2 py-1"
            />
            <select
              value={editForm.folder}
              onChange={(e) =>
                setEditForm({ ...editForm, folder: e.target.value })
              }
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select Folder</option>
              {folders.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex-1">
            <span className={`w-3 h-3 rounded-full ${ui.dot}`} />
            <h3
              className={`text-lg font-semibold ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </h3>
            {ui.label && (
              <span className="text-xs text-gray-400">{ui.label}</span>
            )}
            <p className="text-gray-600">{todo.description}</p>
            <p className="text-sm text-gray-500">
              Folder: {todo.folder?.name || "None"}
            </p>

            {todo.expiresAt ? (
              (() => {
                const { time: clock, date } = formatExpiration(todo.expiresAt);
                return (
                  <div className="mt-2 text-sm">
                    <div className="text-gray-600">
                      ⏰ Expires at <strong>{clock}</strong> · {date}
                    </div>
                    {time?.expired && (
                      <div className="text-red-600 text-xs font-semibold">
                        ⛔ Expired
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <span className="text-gray-400">No expiration</span>
            )}
          </div>
        )}
      </div>

      <div
        className={`ml-4 flex gap-2 transition-opacity
          ${isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        {isEditing ? (
          <button
            onClick={() => onSave(todo._id)}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            disabled={isExpired}
            onClick={() => onEdit(todo)}
            className={`px-3 py-1 rounded ${
              isExpired ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(todo._id)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
