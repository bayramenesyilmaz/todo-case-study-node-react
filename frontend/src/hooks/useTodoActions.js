import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useModal } from "../contexts/ModalContext";
import { todoService } from "../services/todoService";
import {
  updateTodoInList,
  removeTodo,
  setTodos,
  setError,
  updatateTodoStatus,
} from "../store/slices/todoSlice";
import { setTodoLoading } from "../store/slices/loadingSlice";
import { toast } from "react-toastify";

export const useTodoActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showConfirmation } = useModal();
  const loading = useSelector((state) => state.loading.todoActions);

  const refreshTodos = async () => {
    dispatch(setTodoLoading({ todoId: "refresh", isLoading: true }));
    try {
      const response = await todoService.getAllTodos({});
      dispatch(setTodos(response));
    } catch (error) {
      dispatch(setError(error.message));
      toast.error("Todo'lar yenilenemedi: " + error.message);
    } finally {
      dispatch(setTodoLoading({ todoId: "refresh", isLoading: false }));
    }
  };

  const handleDelete = async (id) => {
    showConfirmation({
      title: "Todo'yu Sil",
      message: "Bu todo'yu silmek istediğinizden emin misiniz?",
      onConfirm: async () => {
        dispatch(setTodoLoading({ todoId: id, isLoading: true }));
        try {
          await todoService.deleteTodo(id);
          dispatch(removeTodo(id));
          toast.success("Todo başarıyla silindi!");
        } catch (error) {
          toast.error("Silme işlemi başarısız: " + error.message);
        } finally {
          dispatch(setTodoLoading({ todoId: id, isLoading: false }));
        }
      },
    });
  };

  const handleStatusChange = async (id, currentStatus, status) => {
    dispatch(setTodoLoading({ todoId: id, isLoading: true }));
    try {
      if (currentStatus === status) {
        toast.info("Todo zaten bu durumda.");
        return;
      }
      const response = await todoService.updateTodoStatus(id, status);
      console.log("Status change response:", response);

      dispatch(updatateTodoStatus(response.data));
      toast.success("Durum başarıyla güncellendi!");
    } catch (error) {
      toast.error("Durum güncelleme başarısız: " + error.message);
    } finally {
      dispatch(setTodoLoading({ todoId: id, isLoading: false }));
    }
  };

  const handleQuickEdit = async (id, updates) => {
    dispatch(setTodoLoading({ todoId: id, isLoading: true }));
    try {
      const response = await todoService.updateTodo(id, updates);
      dispatch(updateTodoInList(response.data));
      toast.success("Todo başarıyla güncellendi!");
    } catch (error) {
      toast.error("Güncelleme başarısız: " + error.message);
    } finally {
      dispatch(setTodoLoading({ todoId: id, isLoading: false }));
    }
  };

  const navigateToEdit = (id) => {
    navigate(`/todos/${id}/edit`);
  };

  const navigateToDetail = (id) => {
    navigate(`/todos/${id}`);
  };

  return {
    handleDelete,
    handleStatusChange,
    handleQuickEdit,
    navigateToEdit,
    navigateToDetail,
    refreshTodos,
    isLoading: (todoId) => loading[todoId] || false, // Belirli bir todo'nun yüklenme durumunu kontrol et
  };
};
