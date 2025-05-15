import { motion } from "framer-motion";
import { useParams } from "react-router";
import { useTodo } from "../hooks/useTodo";
import { useModal } from "../contexts/ModalContext";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import TodoForm from "../components/todo/TodoForm";
import { MODAL_TYPES } from "../constants/modalTypes";
import { useTodoActions } from "../hooks/useTodoActions";
import { useNavigate } from "react-router";
import NullData from "../components/common/NullData";
import { TodoDetailHeader } from "../components/todo/detail/TodoDetailHeader";
import { TodoDetailContent } from "../components/todo/detail/TodoDetailContent";

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todo, loading, error, setRender } = useTodo(id);
  const { handleUpdate, handleDelete } = useTodoActions();
  const { openModal, closeModal } = useModal();

  const handleEdit = () => {
    openModal({
      type: MODAL_TYPES.GENERAL,
      title: "Görevi Düzenle",
      content: (
        <TodoForm
          todo={todo}
          onSubmit={async (data) => {
            await handleUpdate(id, data);
            setRender();
            closeModal();
          }}
          onClose={closeModal}
        />
      ),
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!todo) return <NullData text="Not bulunamadı" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      {/* Başlık ve Aksiyon Butonları */}
      <TodoDetailHeader
        title={todo.title}
        onEdit={handleEdit}
        onDelete={async () => await handleDelete(id)}
      />

      {/* Açıklama */}
      <div className="prose dark:prose-invert max-w-none mb-8 break-words">
        <p className="text-gray-600 dark:text-gray-300">{todo.description}</p>
      </div>

      {/* Durum ve Bilgiler */}
      <TodoDetailContent todo={todo} />
    </motion.div>
  );
}
