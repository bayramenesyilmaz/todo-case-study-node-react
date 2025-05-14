import { useDrop } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";
import { useTodoActions } from "../../hooks/useTodoActions";

export default function KanbanBoard({ todos }) {
  const { handleStatusChange, isLoading } = useTodoActions();

  const handleStatusUpdate = async (id, currentStatus, status) => {
    try {
      isLoading(id);
      await handleStatusChange(id, currentStatus, status);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const columns = [
    { status: "pending", title: "Bekleyen" },
    { status: "in_progress", title: "Devam Eden" },
    { status: "completed", title: "Tamamlanan" },
    { status: "cancelled", title: "İptal" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          status={column.status}
          todos={todos.filter((todo) => todo.status === column.status)}
          onDrop={handleStatusUpdate}
        />
      ))}
    </div>
  );
}

const KanbanColumn = ({ title, status, todos, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TODO",
    drop: (item) => onDrop(item.id, item.currentStatus, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const columnColors = {
    pending: "border-yellow-300",
    in_progress: "border-blue-300",
    completed: "border-green-300",
    cancelled: "border-red-300",
  };

  return (
    <div
      ref={drop}
      className={`flex flex-col h-[75vh] p-4 bg-white dark:bg-gray-800 rounded-lg 
        border-t-4 ${columnColors[status]} 
        transition-all duration-200 border-2
        ${isOver ? "bg-gray-50 dark:bg-gray-700" : ""}`}
    >
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
        {title}
      </h3>
      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence mode="popLayout">
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <TodoItem todo={todo} isDraggable />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
