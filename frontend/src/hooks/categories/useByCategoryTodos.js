import { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";
import { useSelector } from "react-redux";

export function useByCategoryTodos(id) {
  const todosFromStore = useSelector((state) => state.todos.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await categoryService.getTodosByCategory(id);
        setTodos(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodos();
    }
  }, [id, todosFromStore, shouldRefresh]);

  const setRender = () => setShouldRefresh(!shouldRefresh);

  return {
    todos,
    loading,
    error,
    setRender,
  };
}
