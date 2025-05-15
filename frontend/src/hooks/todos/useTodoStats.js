import { useState, useEffect } from "react";
import { todoService } from "../../services/todoService";
import { useSelector } from "react-redux";

export function useTodoStats() {
  const todosStore = useSelector((state) => state.todos.items);
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [priorityStats, setPriorityStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsResponse, priorityResponse] = await Promise.all([
          todoService.getTodoStats(),
          todoService.getTodoPriorityStats(),
        ]);

        setStats(statsResponse.data);
        setPriorityStats(priorityResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [todosStore]);

  return { stats, priorityStats, error, loading };
}
