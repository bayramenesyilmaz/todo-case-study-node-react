import { useDrag } from "react-dnd";
import TodoHeader from "./TodoHeader";
import TodoMetaInfo from "./TodoMetaInfo";
import TodoActions from "./TodoActions";
import { useTodoActions } from "../../hooks/useTodoActions";
import { Spinner } from "../common/Spinner";

export default function TodoItem({ todo, isDraggable = false }) {
  const { isLoading } = useTodoActions();
  const loading = isLoading(todo.id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TODO",
    item: { id: todo.id, currentStatus: todo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isDraggable,
  }));

  const statusData = {
    pending: "Bekleyen",
    in_progress: "Devam Eden",
    completed: "Tamamlanan",
    cancelled: "İptal",
  };

  const statusColors = {
    pending: "bg-yellow-100 dark:bg-yellow-900",
    in_progress: "bg-blue-100 dark:bg-blue-900",
    completed: "bg-green-100 dark:bg-green-900",
    cancelled: "bg-red-100 dark:bg-red-900",
  };

  return (
    <div
      ref={isDraggable ? drag : null}
      className={`
        ${statusColors[todo.status]} 
        py-2 px-4 rounded-lg shadow-sm hover:shadow-md
        transition-all duration-200
        mb-2 flex flex-col items-end
        ${isDraggable ? "cursor-move" : ""} 
        ${isDragging ? "opacity-50 scale-95" : "opacity-100"}
      `}
    >
      {/* {loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center rounded-lg">
          <Spinner />
        </div>
      )} */}
      <span
        className={`w-max mb-2 py-1 px-2 rounded text-xs shadow bg-red-500 text-gray-100 font-semibold`}
      >
        {statusData[todo.status]}
      </span>
      <TodoHeader todo={todo} />
      <TodoMetaInfo todo={todo} />
      <TodoActions todoId={todo.id} />
    </div>
  );
}
