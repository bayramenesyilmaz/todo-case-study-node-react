import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { todoService } from "../../services/todoService";

export function useTodo(id) {
  const todoFromStore = useSelector((state) =>
    state.todos.items.find((todo) => todo.id === id)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState(todoFromStore);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const response = await todoService.getTodoById(id);
        setTodo(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (todoFromStore && !shouldRefresh) {
      setTodo(todoFromStore);
    } else {
      if (id) {
        fetchTodo();
      }
    }
  }, [id, todoFromStore, shouldRefresh]);

  const setRender = () => setShouldRefresh(!shouldRefresh);

  return {
    todo,
    loading,
    error,
    setRender,
  };
}
