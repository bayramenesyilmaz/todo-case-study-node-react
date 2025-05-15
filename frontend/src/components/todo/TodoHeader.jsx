import CategoryBadge from "../badges/CategoryBadge";

export default function TodoHeader({ todo }) {
  return (
    <div className="w-full flex flex-col gap-1">
      <h3 className="w-full text-lg font-semibold text-gray-900 dark:text-white truncate">
        {todo.title}
      </h3>
      {todo.description && (
        <p className="w-full text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {todo.description}
        </p>
      )}

      {/* Categories */}
      {todo.categories?.length > 0 && (
        <div className="w-full flex flex-wrap gap-1.5 mt-2">
          {todo.categories.map((category) => (
            <CategoryBadge key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
