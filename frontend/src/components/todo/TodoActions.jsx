import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useTodoActions } from "../../hooks/useTodoActions";

export default function TodoActions({ todoId }) {
  const { handleDelete, navigateToEdit, navigateToDetail } = useTodoActions();

  return (
    <div className="flex justify-end gap-2 mt-4">
      <button
        onClick={() => navigateToDetail(todoId)}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        title="Detay Görüntüle"
      >
        <EyeIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => navigateToEdit(todoId)}
        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
        title="Düzenle"
      >
        <PencilSquareIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleDelete(todoId)}
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        title="Sil"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
