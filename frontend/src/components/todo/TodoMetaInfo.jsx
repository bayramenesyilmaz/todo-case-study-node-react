import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { formatDate, getStatusStyles, isOverdue } from "../../utils/formatters";

export default function TodoMetaInfo({ todo }) {
  const overdue = isOverdue(todo.due_date);
  const isCompleted = todo.status === "completed";
  const { label, className } = getStatusStyles(todo.status);

  return (
    <div className="w-full flex flex-col justify-between items-end  pt-4">
      {/* Tarih Bilgileri */}
      <div className="w-full space-y-1.5 mb-2">
        {/* Bitiş Tarihi */}
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <CalendarIcon className="w-4 h-4" />
          <span>Bitiş: {formatDate(todo.due_date)}</span>
          {!isCompleted && overdue && (
            <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200">
              Gecikmiş
            </span>
          )}
        </div>

        {/* Oluşturulma Tarihi */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ClockIcon className="w-4 h-4" />
          <span>Oluşturulma: {formatDate(todo.created_at)}</span>
        </div>
      </div>

      {/* Durum Etiketi */}
      <span
        className={`py-1 px-2 -mb-2 -mr-2 text-xs border-2 rounded ${className}`}
      >
        {label}
      </span>
    </div>
  );
}
