import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import PriorityIndicator from "./PriorityIndicator";

export default function TodoMetaInfo({ todo }) {
  return (
    <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
      <div className="flex items-center gap-1">
        <CalendarIcon className="w-4 h-4" />
        <span>Bitiş: {new Date(todo.due_date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <ClockIcon className="w-4 h-4" />
        <span>Oluşturulma: {new Date(todo.created_at).toLocaleDateString()}</span>
      </div>
      <PriorityIndicator priority={todo.priority} />
    </div>
  );
}