import { useDueTodos } from "../../hooks/todos/useDueTodos";
import Error from "../common/Error";
import Loading from "../common/Loading";
import NullData from "../common/NullData";
import Title from "../common/Title";
import TodoList from "../todo/TodoList";

export default function DueSoonList() {
  const { todos, error, loading } = useDueTodos();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!todos || todos.length === 0)
    return <NullData text="Sistemde kayıtlı not yok" />;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <Title text="Yaklaşan bitiş tarihleri olan notlar" />
      <TodoList todos={todos} />
    </div>
  );
}
