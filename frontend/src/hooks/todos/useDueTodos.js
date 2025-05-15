import { useState, useEffect } from "react";
import { todoService } from "../../services/todoService";
import { useSelector } from "react-redux";

export function useDueTodos() {
  const todosData = useSelector((state) => state.todos.items);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const params = {
        page: 1,
        per_page: 5,
        sort: "due_date",
        status: "in_progress",
        order: "asc",
      };
      try {
        const response = await todoService.getAllTodos(params);
        setTodos(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [todosData]);

  return { todos, error, loading };
}
