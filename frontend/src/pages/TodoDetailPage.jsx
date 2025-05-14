import React from "react";
import { useParams } from "react-router";
import { useTodo } from "../hooks/useTodo";
import { useModal } from "../contexts/ModalContext";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import TodoForm from "../components/todo/TodoForm";


export default function TodoDetailPage() {
  const { id } = useParams();
  const { todo, loading, error } = useTodo(id);
  const { openModal, closeModal } = useModal();

  const handleEdit = () => {
    openModal({
      title: "Görevi Düzenle",
      content: (
        <TodoForm
          todo={todo}
          categories={[]}
          onSubmit={(data) => {
            console.log("Güncellenen Veri:", data);
            closeModal();
          }}
        />
      ),
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!todo) return <div>Not bulunamadı</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{todo.title}</h1>
      <p className="text-gray-600">{todo.description}</p>
      <button
        onClick={handleEdit}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Düzenle
      </button>
    </div>
  );
}