import React from "react";
import { useDispatch } from "react-redux";
import { assignTodoToFolder } from "../../redux/todoSlice";

function TodoItem({ todo, folders }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
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
