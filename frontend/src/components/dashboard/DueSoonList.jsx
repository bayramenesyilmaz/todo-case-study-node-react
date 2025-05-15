import { useDueTodos } from "../../hooks/useDueTodos";
import Error from "../common/Error";
import Loading from "../common/Loading";
import NullData from "../common/NullData";
import TodoList from "../todo/TodoList";

export default function DueSoonList() {
  const { todos, error, loading } = useDueTodos();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!todos || todos.length === 0)
    return <NullData text="Sistemde kayıtlı not yok" />;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Yaklaşan bitiş tarihleri olan notlar
      </h2>
      <TodoList todos={todos} />
    </div>
  );
}
