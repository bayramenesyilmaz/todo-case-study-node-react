import { useDrag } from "react-dnd";
import TodoHeader from "./TodoHeader";
import TodoMetaInfo from "./TodoMetaInfo";
import TodoActions from "./TodoActions";
import { useTodoActions } from "../../hooks/todos/useTodoActions";
import PriorityBadge from "../badges/PriorityBadge";
import { getStatusStyles } from "../../utils/formatters";
import { Spinner } from "../common/Spinner";

export default function TodoItem({ todo, isDraggable = false }) {
  const { isLoading } = useTodoActions();
  const { className } = getStatusStyles(todo.status);
  const loading = isLoading(todo.id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TODO",
    item: { id: todo.id, currentStatus: todo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isDraggable,
  }));

  return (
    <div
      ref={isDraggable ? drag : null}
      className={`
        ${className} 
        p-4 pt-2 rounded-lg shadow-sm hover:shadow-md
        transition-all duration-200
        mb-2 flex flex-col items-end
        ${isDraggable ? "cursor-move" : ""} 
        ${isDragging || loading ? "opacity-50 scale-95" : "opacity-100"}
      `}
    >
      <div className="w-full flex justify-between items-center">
        <PriorityBadge priority={todo.priority} />
        {loading ? <Spinner /> : <TodoActions todo={todo} />}
      </div>
      <TodoHeader todo={todo} />
      <TodoMetaInfo todo={todo} />
    </div>
  );
}
