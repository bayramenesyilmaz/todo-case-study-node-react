import { useModal } from "../../contexts/ModalContext";
import { useTodoActions } from "../../hooks/todos/useTodoActions";
import Button from "../common/Button";
import TodoForm from "../todo/TodoForm";
import { MODAL_TYPES } from "../../constants/modalTypes";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddTodoButton() {
  const { openModal, closeModal } = useModal();
  const { handleCreate } = useTodoActions();

  const handleClick = () => {
    openModal({
      type: MODAL_TYPES.GENERAL,
      title: "Yeni Not Oluştur",
      content: (
        <TodoForm
          onSubmit={async (data) => {
            await handleCreate(data);
          }}
          onClose={closeModal}
        />
      ),
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      icon={<PlusIcon className="w-5 h-5" />}
      onClick={handleClick}
    >
      Not ekle
    </Button>
  );
}
