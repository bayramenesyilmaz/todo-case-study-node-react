import {
  CircleStackIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useTodoActions } from "../../hooks/useTodoActions";

export default function StatusDropdown({ todo }) {
  const ref = useRef();
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const { handleStatusChange, isLoading } = useTodoActions();
  const loading = isLoading(todo.id);

  const onToggle = () => {
    setShowStatusDropdown(!showStatusDropdown);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (showStatusDropdown) onToggle();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showStatusDropdown, onToggle]);

  const handleStatusUpdate = async (status) => {
    await handleStatusChange(todo.id, todo.status, status);
  };

  const statusOptions = [
    {
      value: "pending",
      label: "Bekleyen",
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      value: "in_progress",
      label: "Devam Eden",
      color: "text-blue-600 bg-blue-50",
    },
    {
      value: "completed",
      label: "Tamamlanan",
      color: "text-green-600 bg-green-50",
    },
    { value: "cancelled", label: "İptal", color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        title="Durum Değiştir"
        disabled={loading}
      >
        {loading ? (
          //animate loading icon
          <CircleStackIcon className="w-5 h-5 animate-spin text-gray-400" />
        ) : (
          <EllipsisVerticalIcon className="w-5 h-5" />
        )}
      </button>

      {showStatusDropdown && !loading && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1 border border-gray-200 dark:border-gray-700">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                handleStatusUpdate(option.value);
                onToggle();
              }}
              className={`
                w-full text-left px-4 py-2 text-sm 
                hover:bg-gray-50 dark:hover:bg-gray-700
                flex items-center justify-between
                ${
                  todo.status === option.value
                    ? option.color
                    : "text-gray-700 dark:text-gray-300"
                }
              `}
            >
              <span>{option.label}</span>
              {todo.status === option.value && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
