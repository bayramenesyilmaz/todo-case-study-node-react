import { useDrop } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

export const KanbanColumn = ({ title, status, todos, onDrop }) => {
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
        transition-all duration-200
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
