import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTodo({ todo }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      {/* YOUR EXISTING TODO UI HERE */}
    </li>
  );
}

export default SortableTodo;
