import { useState } from "react";
import StatusDropdown from "./StatausDropdown";

export default function TodoHeader({ todo }) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  return (
    <div className="w-full flex justify-between items-start mb-2">
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white">
          {todo.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {todo.description}
        </p>
      </div>

      <StatusDropdown
        todo={todo}
        isOpen={showStatusDropdown}
        onToggle={() => setShowStatusDropdown(!showStatusDropdown)}
      />
    </div>
  );
}
