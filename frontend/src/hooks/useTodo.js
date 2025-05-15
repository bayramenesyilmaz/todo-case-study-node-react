import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { todoService } from "../services/todoService";

export function useTodo(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Redux store'dan todo'yu al
  const todoFromStore = useSelector((state) =>
    state.todos.items.find((todo) => todo.id === id)
  );
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

    // Redux store'da todo varsa ve yenileme istenmemişse store'dan al
    if (todoFromStore && !shouldRefresh) {
      setTodo(todoFromStore);
    } else {
      // Redux store'da yoksa veya yenileme istenmişse API'den al
      fetchTodo();
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
