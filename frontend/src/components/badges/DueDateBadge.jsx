import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { isOverdue, formatDate } from "../../utils/formatters";

export default function DueDateBadge({ date, created_at }) {
  const overdue = isOverdue(date);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Bitiş: {formatDate(date)}
        </span>
        {overdue && (
          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200 rounded-full">
            Gecikmiş
          </span>
        )}
      </div>
      {created_at && (
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Oluşturulma: {formatDate(created_at)}
          </span>
        </div>
      )}
    </div>
  );
}