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
      <div className="flex flex-col gap-4">
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
        {todo.shared_with?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Erişebilen kullanıcılar
            </h3>
            <div className="flex flex-wrap gap-x-1 text-sm text-gray-800 dark:text-gray-200">
              {todo.shared_with.map((user, index) => (
                <span key={user.id}>
                  {user.name}
                  {index < todo.shared_with.length - 1 && <span>,&nbsp;</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
