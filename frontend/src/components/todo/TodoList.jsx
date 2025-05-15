import TodoItem from "./TodoItem";
import { motion } from "framer-motion";
import Button from "../common/Button";
import NullData from "../common/NullData";
import { useViewSettings } from "../../hooks/useViewSettings";

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
  const { listView, updateListView } = useViewSettings();

  return (
    <div className="space-y-4">
      <div className="hidden md:flex justify-end space-x-2 mb-4">
        <Button
          children="Liste"
          onClick={() => updateListView("list")}
          variant={listView === "list" ? "primary" : "secondary"}
        />
        <Button
          children="Grid"
          onClick={() => updateListView("grid")}
          variant={listView === "grid" ? "primary" : "secondary"}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`${
          listView === "grid"
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
