import { useState } from "react";
import TodoItem from "./TodoItem";
import { motion } from "framer-motion";
import Button from "../common/Button";
import { useWindowWidth } from "../../utils/formatters";
import NullData from "../common/NullData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function TodoList({ todos }) {
  const [viewMode, setViewMode] = useState("list"); // 'list' veya 'grid'

  return (
    <div className="space-y-4">
      <div className="hidden md:flex justify-end space-x-2 mb-4">
        <Button
          children="Liste"
          onClick={() => setViewMode("list")}
          variant={viewMode === "list" ? "primary" : "secondary"}
        />
        <Button
          children="Grid"
          onClick={() => setViewMode("grid")}
          variant={viewMode === "grid" ? "primary" : "secondary"}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        }`}
      >
        {todos.length === 0 ? (
          <NullData text="Sistemde kayıtlı not yok" />
        ) : (
          todos.map((todo) => (
            <motion.div key={todo.id} variants={item}>
              <TodoItem todo={todo} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
