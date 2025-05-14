import { useState, useEffect } from "react";
import { todoService } from "../services/todoService";

export function useTodoStats() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await todoService.getTodoStats();
        setStats(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { stats, error, loading };
}
