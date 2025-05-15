import CategoryBadge from "../../badges/CategoryBadge";
import DueDateBadge from "../../badges/DueDateBadge";
import PriorityBadge from "../../badges/PriorityBadge";
import StatusBadge from "../../badges/StatusBadge";

export function TodoDetailContent({ todo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sol Kolon - Durum ve Öncelik */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={todo.status} />
          <PriorityBadge priority={todo.priority} />
        </div>
        <DueDateBadge date={todo.due_date} created_at={todo.created_at} />
      </div>

      {/* Sağ Kolon - Kategoriler */}
      {todo.categories?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Kategoriler
          </h3>
          <div className="flex flex-wrap gap-2">
            {todo.categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
