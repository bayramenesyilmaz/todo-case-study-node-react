import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export function TodoDetailHeader({ title, onEdit, onDelete }) {
  return (
    <div className="flex flex-col-reverse gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white break-words">
        {title}
      </h1>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors"
          title="Düzenle"
        >
          <PencilSquareIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
          title="Sil"
        >
          <TrashIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
