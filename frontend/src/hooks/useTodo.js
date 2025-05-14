import { useState, useEffect } from "react";
import { todoService } from "../services/todoService";

export function useTodo(id) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await todoService.getTodoById(id);
        setTodo(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  return { todo, error, loading };
}
