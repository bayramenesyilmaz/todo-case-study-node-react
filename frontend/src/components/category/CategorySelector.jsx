import { useCategories } from "../../hooks/useCategories";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CategorySelector({ value = [], onChange, error }) {
  const { categories } = useCategories();

  const handleSelect = (categoryId) => {
    if (value.includes(categoryId)) {
      onChange(value.filter((id) => id !== categoryId));
    } else {
      onChange([...value, categoryId]);
    }
  };

  const selectedCategories = categories.filter((cat) => value.includes(cat.id));

  return (
    <div className="space-y-2">
      {/* Seçili Kategoriler */}
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {selectedCategories.map((category) => (
          <span
            key={category.id}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color,
            }}
          >
            {category.name}
            <button
              type="button"
              onClick={() => handleSelect(category.id)}
              className="p-0.5 hover:bg-black/10 rounded-full"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>

      {/* Kategori Listesi */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-gray-400 shadow-lg p-2 rounded-lg max-h-40 overflow-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleSelect(category.id)}
            className={`p-2 rounded text-sm text-left transition-colors ${
              value.includes(category.id)
                ? "border-2 border-cyan-500 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700"
                : " hover:bg-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </div>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}