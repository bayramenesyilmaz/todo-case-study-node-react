import { useState, useEffect } from "react";
import { todoService } from "../../services/todoService";
import { useSelector } from "react-redux";

export function useSearch() {
  const initialTodos = useSelector((state) => state.todos.items);
  const [searchQuery, setSearchQuery] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState(initialTodos || []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        console.log(searchQuery);

        const response = await todoService.searchTodos({ q: searchQuery });
        setTodos(response.data);

        console.log("log : ", response.data);
      } catch (error) {
        console.log(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [searchQuery, initialTodos]);

  return { todos, error, loading, setSearchQuery };
}
