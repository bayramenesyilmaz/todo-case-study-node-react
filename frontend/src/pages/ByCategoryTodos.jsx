import { useParams } from "react-router";
import { useByCategoryTodos } from "../hooks/categories/useByCategoryTodos";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import NullData from "../components/common/NullData";
import TodoList from "../components/todo/TodoList";
import Title from "../components/common/Title";
import { useCategory } from "../hooks/categories/useCategory";

export default function ByCategoryTodos() {
  const { catId } = useParams();
  const { todos, error, loading } = useByCategoryTodos(catId);
  const { category, error: catError, loading: catLoading } = useCategory(catId);

  const categoryContent = catLoading
    ? "Yükleniyor..."
    : catError
    ? catError.message
    : category
    ? category.name
    : " Kategori bulunamadı";

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!todos || todos.length === 0)
    return <NullData note={categoryContent} text="kategorisine ait not yok" />;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <Title text={`| ${categoryContent} | kategorisine ait notlar`} />
      <TodoList todos={todos} />
    </div>
  );
}
