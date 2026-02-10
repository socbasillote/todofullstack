import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTodo,
  getTodos,
  setFilter,
  toggleTodo,
  updateTodo,
  updateTodoOrder,
  saveTodoOrder,
} from "../../redux/todoSlice";
import { fetchFolders } from "../../redux/folder/folderThunks";

import { useFilteredTodos } from "../../hooks/useFilteredTodos";
import FinishedTodos from "./FinishedTodos";
import TodoItem from "./TodoItem";
import TodoStats from "./TodoStats";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

function TodoList() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state) => state.todo);
  const { folders, activeFolder } = useSelector((state) => state.folder);

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    folder: "",
    hasExpiration: false,
    expiresIn: null,
  });

  const [, forceTick] = useState(0);

  useEffect(() => {
    dispatch(fetchFolders());
    dispatch(getTodos());
  }, [dispatch]);

  useEffect(() => {
    const i = setInterval(() => forceTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const filteredTodos = useFilteredTodos(todos, filter, activeFolder);
  const finishedTodos =
    filter === "finished" ? todos.filter((t) => t.completed) : [];

  const orderedTodos = [...filteredTodos]
    .filter((t) => (activeFolder ? t.folder?._id === activeFolder : !t.folder))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleEdit = (todo) => {
    setEditingTodoId(todo._id);
    setEditForm({
      title: todo.title,
      description: todo.description,
      folder: todo.folder?._id || "",
      hasExpiration: Boolean(todo.expiresAt),
      expiresIn: todo.expiresAt
        ? Math.ceil((new Date(todo.expiresAt) - Date.now()) / 60000)
        : 60,
    });
  };

  const handleSave = (id) => {
    dispatch(
      updateTodo({
        id,
        form: {
          title: editForm.title,
          description: editForm.description,
          folder: editForm.folder || null,
          expiresIn: editForm.hasExpiration ? editForm.expiresIn : null,
        },
      }),
    );
    setEditingTodoId(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    if (filter !== "ongoing" || activeFolder) return;

    const oldIndex = orderedTodos.findIndex((t) => t._id === active.id);
    const newIndex = orderedTodos.findIndex((t) => t._id === over.id);

    const newOrder = arrayMove(orderedTodos, oldIndex, newIndex).map(
      (t, index) => ({
        ...t,
        order: index,
      }),
    );

    // Optimistic UI update
    dispatch(updateTodoOrder(newOrder));

    // Persist to backend
    dispatch(saveTodoOrder(newOrder));
  };

  return (
    <div className="flex flex-col">
      <TodoStats todos={todos} />
      <div className="flex gap-2 mb-4">
        <button onClick={() => dispatch(setFilter("ongoing"))}>
          🟢 Ongoing
        </button>
        <button onClick={() => dispatch(setFilter("finished"))}>
          ✅ Finished
        </button>
        <button onClick={() => dispatch(setFilter("active"))}>⏳ Active</button>
        <button onClick={() => dispatch(setFilter("expired"))}>
          ⛔ Expired
        </button>
      </div>

      {filter === "finished" ? (
        <FinishedTodos todos={finishedTodos} />
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedTodos.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-4">
              {orderedTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  folders={folders}
                  editingTodoId={editingTodoId}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  onToggle={(id) => dispatch(toggleTodo(id))}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onDelete={(id) => dispatch(deleteTodo(id))}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default TodoList;
