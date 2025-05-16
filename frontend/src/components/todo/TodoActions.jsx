import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useTodoActions } from "../../hooks/todos/useTodoActions";
import StatusDropdown from "./StatausDropdown";
import { useModal } from "../../contexts/ModalContext";
import { MODAL_TYPES } from "../../constants/modalTypes";
import TodoForm from "./TodoForm";

export default function TodoActions({ todo }) {
  const { openModal, closeModal } = useModal();
  const { handleDelete, handleUpdate, navigateToDetail } = useTodoActions();

  const handleEdit = () => {
    openModal({
      type: MODAL_TYPES.GENERAL,
      title: "Görevi Düzenle",
      content: (
        <TodoForm
          todo={todo}
          categories={todo.categories}
          onSubmit={async (data) => {
            await handleUpdate(todo.id, data);
            // closeModal();
          }}
          onClose={closeModal}
        />
      ),
    });
  };

  return (
    <div className="flex justify-end -mr-3">
      <button
        onClick={() => navigateToDetail(todo.id)}
        className="p-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
        title="Detay Görüntüle"
      >
        <EyeIcon className="w-5 h-5" />
      </button>
      <button
        onClick={handleEdit}
        className="p-2 text-gray-500 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full transition-colors"
        title="Düzenle"
      >
        <PencilSquareIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleDelete(todo.id)}
        className="p-2 text-gray-500 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
        title="Sil"
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      <StatusDropdown todo={todo} />
    </div>
  );
}
