import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useModal } from "../../contexts/ModalContext";
import { todoService } from "../../services/todoService";
import {
  updateTodoInList,
  removeTodo,
  setTodos,
  setError,
  addTodo,
  updatateTodoStatus,
} from "../../store/slices/todoSlice";
import { setTodoLoading } from "../../store/slices/loadingSlice";
import { toast } from "react-toastify";
import { MODAL_TYPES } from "../../constants/modalTypes";

export const useTodoActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const loading = useSelector((state) => state.loading.todoActions);

  const refreshTodos = async () => {
    dispatch(setTodoLoading({ todoId: "refresh", isLoading: true }));
    try {
      const response = await todoService.getAllTodos({});
      dispatch(setTodos(response));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setTodoLoading({ todoId: "refresh", isLoading: false }));
    }
  };

  const handleCreate = async (data) => {
    dispatch(setTodoLoading({ todoId: "add", isLoading: true }));
    try {
      const response = await todoService.createTodo(data);
      dispatch(addTodo(response.data));
      toast.success("Not başarıyla eklendi!");
    } catch (error) {
      toast.error("Not ekleme işlemi başarısız: " + error.message);
    } finally {
      dispatch(setTodoLoading({ todoId: "add", isLoading: false }));
    }
  };

  const handleDelete = async (id) => {
    openModal({
      type: MODAL_TYPES.CONFIRM,
      title: "Notu Sil",
      message: "Bu notu silmek istediğinizden emin misiniz?",
      onConfirm: async () => {
        dispatch(setTodoLoading({ todoId: id, isLoading: true }));
        try {
          await todoService.deleteTodo(id);
          dispatch(removeTodo(id));
          toast.success("Not başarıyla silindi!");
          navigate("/todos");
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
        toast.info("Not zaten bu durumda.");
        return;
      }
      const response = await todoService.updateTodoStatus(id, status);

      dispatch(updatateTodoStatus(response.data));
      toast.success("Durum başarıyla güncellendi!");
    } catch (error) {
      toast.error("Durum güncelleme başarısız: " + error.message);
    } finally {
      dispatch(setTodoLoading({ todoId: id, isLoading: false }));
    }
  };

  const handleUpdate = async (id, updates) => {
    dispatch(setTodoLoading({ todoId: id, isLoading: true }));
    try {
      const response = await todoService.updateTodo(id, updates);
      console.log("response : ", response.data);

      dispatch(updateTodoInList(response.data));
      toast.success("Not başarıyla güncellendi!");
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
    handleCreate,
    handleDelete,
    handleStatusChange,
    handleUpdate,
    navigateToEdit,
    navigateToDetail,
    refreshTodos,
    isLoading: (todoId) => loading[todoId] || false, // Belirli bir todo'nun yüklenme durumunu kontrol et
  };
};
