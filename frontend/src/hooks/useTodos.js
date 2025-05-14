import { useDispatch, useSelector } from "react-redux";
import { todoService } from "../services/todoService";
import {
  setTodos,
  setFilters,
  setPagination,
  setError,
} from "../store/slices/todoSlice";
import { setTodoLoading } from "../store/slices/loadingSlice";
import { useEffect } from "react";

export function useTodos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const pagination = useSelector((state) => state.todos.pagination);
  const filters = useSelector((state) => state.todos.filters);
  const loading = useSelector((state) => state.loading.todoActions["fetch"]); // Genel fetch işlemi için loading durumu
  const error = useSelector((state) => state.todos.error);

  const fetchTodos = async () => {
    dispatch(setTodoLoading({ todoId: "fetch", isLoading: true }));
    dispatch(setError(null));

    try {
      const params = {
        ...filters,
        page: pagination.current_page,
        per_page: pagination.per_page,
      };

      const response = await todoService.getAllTodos(params);
      dispatch(setTodos(response));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setTodoLoading({ todoId: "fetch", isLoading: false }));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters, pagination.current_page]);

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(setPagination({ current_page: 1 }));
  };

  const updatePage = (newPage) => {
    dispatch(setPagination({ current_page: newPage }));
  };

  return {
    todos,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    updatePage,
  };
}