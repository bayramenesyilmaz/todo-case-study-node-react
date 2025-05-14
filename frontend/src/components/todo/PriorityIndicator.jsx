import React from "react";

export default function PriorityIndicator({ priority }) {
  const priorityColors = {
    high: "bg-red-200 text-red-800",
    medium: "bg-yellow-200 text-yellow-800",
    low: "bg-green-200 text-green-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${priorityColors[priority]}`}>
      {priority}
    </span>
  );
}
