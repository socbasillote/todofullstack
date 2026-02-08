import React from "react";
import { useDispatch } from "react-redux";
import { assignTodoToFolder } from "../../redux/todoSlice";
import { getTodosStatus } from "../../utils/todoStatus";
import { TODO_STATUS } from "../../constants/todoStatusConfig";

function TodoItem({ todo, folders }) {
  const status = getTodosStatus(todo);
  const ui = TODO_STATUS[status];

  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      {/* Status */}

      <span className={`w-3 h-3 rounded-full ${ui.dot}`} title={ui.label} />
      <span>{todo.title}</span>

      <select
        value={todo.folderId || ""}
        onChange={(e) =>
          dispatch(
            assignTodoToFolder({
              todoId: todo._id,
              folderId: e.target.value || null,
            }),
          )
        }
        className="text-sm border rounded"
      >
        <option value="">Inbox</option>
        {folders.map((f) => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TodoItem;
